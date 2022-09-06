import apiClientFactory from 'aws-api-gateway-client';
import {DrillVideoAngle} from "../constants/drillVideoAngle";
import {isRemoteMedia} from '../util/fileUtil';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {addFileCacheMapping} from "../file-cache/fileCache";
import getEnvVars from "../environment";

class HttpClient {

    #client = apiClientFactory.newClient({
        invokeUrl: getEnvVars().apiUrl,
        region: 'us-west-2',
        accessKey: 'AKIAXTDBP63P4IWBNXM6',
        secretKey: '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',
    });

    isAppVersionCompatible = async (version) => {
        try {
            const response = await this.#client.invokeApi({}, '/app-version/is-compatible', 'POST', {}, {
                version,
            });
            return response.data;
        } catch (err) {
            console.log(err);
            return {
                isCompatible: true // default to true since it is overwhelmingly likely to be the case
            }
        }
    }

    initiateSignUp = async ({email, password, firstName, lastName}) => {
        try {
            const response = await this.#client.invokeApi({}, '/player/sign-up/initiate', 'POST', {}, {
                email,
                password,
                firstName,
                lastName
            });
            return {
                success: true,
                ...response.data
            };
        } catch (err) {
            console.log(err.response.status);
            if (err.response.status === 403 || err.response.status === 400) {
                return {
                    success: false
                }
            }

            throw err
        }
    }

    completeSignUp = async ({playerId, verificationCode, expoPushToken}) => {
        try {
            const response = await this.#client.invokeApi({}, '/player/sign-up/complete', 'POST', {}, {
                playerId,
                expoPushToken,
                code: verificationCode
            });
            return {
                success: true,
                ...response.data
            };
        } catch (err) {
            console.log(err.response.status);
            if (err.response.status === 403 || err.response.status === 400) {
                return {
                    success: false
                }
            }

            throw err
        }
    }

    signIn = async ({email, password, expoPushToken}) => {
        try {
            const response = await this.#client.invokeApi({}, '/player/sign-in', 'POST', {}, {
                email,
                password,
                expoPushToken
            });
            return {
                success: true,
                ...response.data
            };
        } catch (err) {
            console.log(err.response.status);
            if (err.response.status === 403 || err.response.status === 400) {
                return {
                    success: false
                }
            }

            throw err
        }
    }

    validateInviteCode = async (invitationCode, expoPushToken) => {
        try {
            const response = await this.#client.invokeApi({}, '/invitation-code/validate', 'POST', {}, {
                invitationCode: invitationCode.trim(),
                expoPushToken: expoPushToken
            });

            return {
                success: true,
                ...response.data
            };
        } catch(err) {
            console.log(err.response.status);
            if (err.response.status === 403 || err.response.status === 400) {
                return {
                    success: false
                }
            }

            throw err
        }
    }

    getDrillsForPlayer = async (playerId) => {
        const result = await this.#client.invokeApi({}, '/drills/player/get', 'POST', {}, {
            playerId: playerId
        });

        return result.data.drills;
    }

    getInboxForPlayer = async (playerId) => {
        const result = await this.#client.invokeApi({}, '/player/inbox/get', 'POST', {}, {
            playerId: playerId
        });

        return result.data.entries;
    }

    markFeedbackAsViewed = async (sessionNumber, playerId) => {
        await this.#client.invokeApi({}, '/sessions/feedback/view', 'POST', {}, {
            playerId: playerId,
            sessionNumber: sessionNumber
        });
    }

    updatePlayer = async ({playerId, coachId, firstName, lastName, email, headshot}) => {
        const currentPlayer = await this.getPlayer(playerId);

        const updatedPlayer = {
            ...currentPlayer,
            coachId,
            firstName,
            lastName,
            email,
            headshot
        }

        if (!!headshot && !!headshot.uri && !isRemoteMedia(headshot)) {
            const mediaUploadUrl = await this.getMediaUploadUrl('player/headshot');
            await this.uploadFile(headshot, mediaUploadUrl.uploadUrl);
            updatedPlayer.headshot = {
                fileLocation: mediaUploadUrl.fileLocation,
                uploadDateEpochMillis: new Date().getTime() // TODO: move updating of this to BE
            }
            await addFileCacheMapping(mediaUploadUrl.fileLocation, headshot.uri);
        }

        await this.#client.invokeApi({}, '/player/update', 'POST', {},{
            player: updatedPlayer
        });
        return await this.getPlayer(playerId);
    }

    updateCoach = async ({coachId, firstName, lastName, email, about, position, school, youthClub, headshot, introSessionDrills}) => {
        const currentCoach = await this.getCoach(coachId);

        const updatedCoach = {
            ...currentCoach,
            firstName,
            lastName,
            email,
            about,
            position,
            school,
            youthClub,
            headshot,
            introSessionDrills
        }

        if (!!headshot && !!headshot.uri && !isRemoteMedia(headshot)) {
            const mediaUploadUrl = await this.getMediaUploadUrl('coach/headshot');
            await this.uploadFile(headshot, mediaUploadUrl.uploadUrl);
            updatedCoach.headshot = {
                fileLocation: mediaUploadUrl.fileLocation,
                uploadDateEpochMillis: new Date().getTime() // TODO: move updating of this to BE
            }
            await addFileCacheMapping(mediaUploadUrl.fileLocation, headshot.uri);
        }
        await this.#client.invokeApi({}, '/coach/update', 'POST', {},{
            coach: updatedCoach
        });
        return await this.getCoach(coachId);
    }

    getCoach = async (coachId) => {
        try {
            const response = await this.#client.invokeApi({}, '/coach/get', 'POST', {},{
                coachId: coachId
            });
            return response.data.coach;
        } catch(err) {
            console.log(err.response.status);
            if (err.response.status === 404) {
                return null
            }

            throw err
        }
    }

    listCoaches = async () => {
        const response = await this.#client.invokeApi({}, '/coaches/list', 'POST', {}, {
            limit: -1
        });
        return response.data.coaches;
    }

    createSubscription = async ({token, subscriptionPlanRef}) => {
        await this.#client.invokeApi({}, '/player/subscription/create', 'POST', {}, {
            token: token,
            subscriptionPlanRef: subscriptionPlanRef
        });
    }

    getPlayer = async (playerId) => {
        try {
            const response = await this.#client.invokeApi({}, '/player/get', 'POST', {},{
                playerId: playerId
            });
            return response.data.player;
        } catch(err) {
            console.log(err.response.status);
            if (err.response.status === 404) {
                return null
            }

            throw err
        }
    }

    deletePlayer = async (playerId) => {
        await this.#client.invokeApi({}, '/player/account/delete', 'POST', {},{
            playerId: playerId
        });
    }

    getPlayerSessions = async (playerId) => {
        const response = await this.#client.invokeApi({}, '/sessions/player/get', 'POST', {}, {
            playerId: playerId
        });

        return response.data.sessions;
    }

    getPlayerSessionsForCoach = async (coachId) => {
        const response = await this.#client.invokeApi({}, '/sessions/coach/get', 'POST', {}, {
            coachId: coachId
        });

        return response.data.playerSessions;
    }

    getSubscription = async (playerId) => {
        try {
            const response = await this.#client.invokeApi({}, '/player/subscription/get', 'POST', {}, {
                playerId: playerId,
            });
            return response.data.subscription;
        } catch(err) {
            if (err.response.status === 404) {
                return null;
            }

            throw err
        }
    }

    getPlayersAndSubscriptionsForCoach = async (coachId) => {
        const response = await this.#client.invokeApi({}, '/coach/players-and-subscriptions/get', 'POST', {}, {
            coachId: coachId
        });

        return response.data.playersAndSubscriptions;
    }

    getDrill = async ({drillId}) => {
        const response = await this.#client.invokeApi({}, '/drills/get', 'POST', {},{
            drillId
        });
        return response.data.drill;
    }

    createDrill = async ({coachId, name, description, category, equipment}) => {
        const createDrillResponse = await this.#client.invokeApi({}, '/drills/create', 'POST', {}, {
            drill: {
                coachId: coachId,
                name: name,
                description: description,
                category: category,
                equipment: equipment
            }
        });

        return createDrillResponse.data.drill;
    }


    updateDrill = async ({drill, frontVideo, sideVideo, closeVideo, frontVideoThumbnail, sideVideoThumbnail, closeVideoThumbnail}, requestId, onProgressChange) => {
        const currentDrill = await this.getDrill({drillId: drill.drillId});
        const currentTime = new Date().getTime() // TODO: move updating of this to BE

        let [
            frontThumbnailFileLocation,
            sideThumbnailFileLocation,
            closeThumbnailFileLocation,
            frontFileLocation,
            sideFileLocation,
            closeFileLocation
        ] = await Promise.all([
            AsyncStorage.getItem(`longRequest:${requestId}:frontThumbnail`),
            AsyncStorage.getItem(`longRequest:${requestId}:sideThumbnail`),
            AsyncStorage.getItem(`longRequest:${requestId}:closeThumbnail`),
            AsyncStorage.getItem(`longRequest:${requestId}:front`),
            AsyncStorage.getItem(`longRequest:${requestId}:side`),
            AsyncStorage.getItem(`longRequest:${requestId}:close`)
        ]);

        const [didFrontChange, didSideChange, didCloseChange] = await Promise.all([
            (async () => {
                if (!isRemoteMedia(frontVideo) && !frontThumbnailFileLocation) {
                    const fileLocation = await this.uploadDemoVideoThumbnail(drill.drillId, DrillVideoAngle.Front, frontVideoThumbnail)
                    frontThumbnailFileLocation = fileLocation;
                    await AsyncStorage.setItem(`longRequest:${requestId}:frontThumbnail`, fileLocation);
                    await addFileCacheMapping(fileLocation, frontVideoThumbnail.uri);
                    onProgressChange((!!frontThumbnailFileLocation + !!sideThumbnailFileLocation + !!closeThumbnailFileLocation + !!frontFileLocation + !!sideFileLocation + !!closeFileLocation) / 6);
                    return true;
                }
                onProgressChange((!!frontThumbnailFileLocation + !!sideThumbnailFileLocation + !!closeThumbnailFileLocation + !!frontFileLocation + !!sideFileLocation + !!closeFileLocation) / 6);
                return false;
            })(),
            (async () => {
                if (!isRemoteMedia(sideVideo) && !sideThumbnailFileLocation) {
                    const fileLocation = await this.uploadDemoVideoThumbnail(drill.drillId, DrillVideoAngle.Side, sideVideoThumbnail)
                    sideThumbnailFileLocation = fileLocation;
                    await AsyncStorage.setItem(`longRequest:${requestId}:sideThumbnail`, fileLocation);
                    await addFileCacheMapping(fileLocation, sideVideoThumbnail.uri);
                    onProgressChange((!!frontThumbnailFileLocation + !!sideThumbnailFileLocation + !!closeThumbnailFileLocation + !!frontFileLocation + !!sideFileLocation + !!closeFileLocation) / 6);
                    return true;
                }
                onProgressChange((!!frontThumbnailFileLocation + !!sideThumbnailFileLocation + !!closeThumbnailFileLocation + !!frontFileLocation + !!sideFileLocation + !!closeFileLocation) / 6);
                return false;
            })(),
            (async () => {
                if (!isRemoteMedia(closeVideo) && !closeThumbnailFileLocation) {
                    const fileLocation = await this.uploadDemoVideoThumbnail(drill.drillId, DrillVideoAngle.Close, closeVideoThumbnail)
                    closeThumbnailFileLocation = fileLocation;
                    await AsyncStorage.setItem(`longRequest:${requestId}:closeThumbnail`, fileLocation);
                    await addFileCacheMapping(fileLocation, closeVideoThumbnail.uri);
                    onProgressChange((!!frontThumbnailFileLocation + !!sideThumbnailFileLocation + !!closeThumbnailFileLocation + !!frontFileLocation + !!sideFileLocation + !!closeFileLocation) / 6);
                    return true;
                }
                onProgressChange((!!frontThumbnailFileLocation + !!sideThumbnailFileLocation + !!closeThumbnailFileLocation + !!frontFileLocation + !!sideFileLocation + !!closeFileLocation) / 6);
                return false;
            })()
        ]);

        if (didFrontChange || didSideChange || didCloseChange) {
            await this.#client.invokeApi({}, '/drills/update', 'POST', {}, {
                drill: {
                    ...currentDrill,
                    ...drill,
                    demos: {
                        ...drill.demos,
                        frontThumbnail: !isRemoteMedia(frontVideoThumbnail) ? {fileLocation: frontThumbnailFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.frontThumbnail,
                        sideThumbnail: !isRemoteMedia(sideVideoThumbnail) ?  {fileLocation: sideThumbnailFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.sideThumbnail,
                        closeThumbnail: !isRemoteMedia(closeVideoThumbnail) ? {fileLocation: closeThumbnailFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.closeThumbnail,
                    }
                }
            });
        }

        await Promise.all([
            (async () => {
                if (!isRemoteMedia(frontVideo) && !frontFileLocation) {
                    const fileLocation = await this.uploadDemoVideo(drill.drillId, DrillVideoAngle.Front, frontVideo)
                    frontFileLocation = fileLocation;
                    await AsyncStorage.setItem(`longRequest:${requestId}:front`, fileLocation);
                    await addFileCacheMapping(fileLocation, frontVideo.uri);
                }
                onProgressChange((!!frontThumbnailFileLocation + !!sideThumbnailFileLocation + !!closeThumbnailFileLocation + !!frontFileLocation + !!sideFileLocation + !!closeFileLocation) / 6);
            })(),
            (async () => {
                if (!isRemoteMedia(sideVideo) && !sideFileLocation) {
                    const fileLocation = await this.uploadDemoVideo(drill.drillId, DrillVideoAngle.Side, sideVideo)
                    sideFileLocation = fileLocation;
                    await AsyncStorage.setItem(`longRequest:${requestId}:side`, fileLocation);
                    await addFileCacheMapping(fileLocation, sideVideo.uri);
                }
                onProgressChange((!!frontThumbnailFileLocation + !!sideThumbnailFileLocation + !!closeThumbnailFileLocation + !!frontFileLocation + !!sideFileLocation + !!closeFileLocation) / 6);
            })(),
            (async () => {
                if (!isRemoteMedia(closeVideo) && !closeFileLocation) {
                    const fileLocation = await this.uploadDemoVideo(drill.drillId, DrillVideoAngle.Close, closeVideo)
                    closeFileLocation = fileLocation;
                    await AsyncStorage.setItem(`longRequest:${requestId}:close`, fileLocation);
                    await addFileCacheMapping(fileLocation, closeVideo.uri);
                }
                onProgressChange((!!frontThumbnailFileLocation + !!sideThumbnailFileLocation + !!closeThumbnailFileLocation + !!frontFileLocation + !!sideFileLocation + !!closeFileLocation) / 6);
            })()
        ]);

        await this.#client.invokeApi({}, '/drills/update', 'POST', {}, {
            drill: {
                ...currentDrill,
                ...drill,
                demos: {
                    front: !isRemoteMedia(frontVideo) ? {fileLocation: frontFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.front,
                    side: !isRemoteMedia(sideVideo) ? {fileLocation: sideFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.side,
                    close: !isRemoteMedia(closeVideo) ? {fileLocation: closeFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.close,
                    frontThumbnail: !isRemoteMedia(frontVideoThumbnail) ? {fileLocation: frontThumbnailFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.frontThumbnail,
                    sideThumbnail: !isRemoteMedia(sideVideoThumbnail) ?  {fileLocation: sideThumbnailFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.sideThumbnail,
                    closeThumbnail: !isRemoteMedia(closeVideoThumbnail) ? {fileLocation: closeThumbnailFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.closeThumbnail,
                }
            }
        });

        // reclaim storage space
        await Promise.all([
            AsyncStorage.removeItem(`longRequest:${requestId}:frontThumbnail`),
            AsyncStorage.getItem(`longRequest:${requestId}:sideThumbnail`),
            AsyncStorage.getItem(`longRequest:${requestId}:closeThumbnail`),
            AsyncStorage.getItem(`longRequest:${requestId}:front`),
            AsyncStorage.getItem(`longRequest:${requestId}:side`),
            AsyncStorage.getItem(`longRequest:${requestId}:close`)
        ]);
    }

    deleteDrill = async (drillId) => {
        await this.#client.invokeApi({}, '/drills/delete', 'POST', {}, {
            drillId: drillId,
        });
    }

    getDrillsForCoach = async (coachId) => {
        const response = await this.#client.invokeApi({}, '/drills/coach/get', 'POST', {}, {
            coachId: coachId
        });

        return response.data;
    }

    createSession = async ({playerId, drills}) => {
        await this.#client.invokeApi({}, '/sessions/create', 'POST', {}, {
            session: {
                playerId: playerId,
                drills: drills.map(drill => {
                    return {
                        drillId: drill.drillId,
                        notes: drill.notes,
                        estimatedDurationMinutes: drill.estimatedDurationMinutes
                    }
                })
            }
        });
    }

    updateSession = async ({playerId, sessionNumber, drills}) => {
        const currentSession = await this.getSession({playerId, sessionNumber});
        await this.#client.invokeApi({}, '/sessions/update', 'POST', {}, {
            session: {
                ...currentSession,
                drills: drills.map(drill => {
                    return {
                        drillId: drill.drillId,
                        notes: drill.notes,
                        estimatedDurationMinutes: drill.estimatedDurationMinutes
                    }
                })
            }
        });
    }

    getSession = async ({playerId, sessionNumber}) => {
        const response = await this.#client.invokeApi({}, '/sessions/get', 'POST', {}, {
            playerId: playerId,
            sessionNumber: sessionNumber,
        });
        return response.data.session;
    }

    deleteSession = async ({playerId, sessionNumber}) => {
        await this.#client.invokeApi({}, '/sessions/delete', 'POST', {}, {
            playerId: playerId,
            sessionNumber: sessionNumber,
        });
    }

    createSubmission = async ({playerId, sessionNumber, drillId, video, videoThumbnail}) => {
        const [videoFileLocation, thumbnailFileLocation] = await Promise.all([
            (async () => {
                const mediaUploadUrl = await this.getMediaUploadUrl(`submission/${playerId}/${sessionNumber}/${drillId}`)
                await this.uploadFile(video, mediaUploadUrl.uploadUrl);
                return mediaUploadUrl.fileLocation;
            })(),
            (async () => {
                const mediaUploadUrl = await this.getMediaUploadUrl(`submission/${playerId}/${sessionNumber}/${drillId}/thumbnail`)
                await this.uploadFile(videoThumbnail, mediaUploadUrl.uploadUrl);
                return mediaUploadUrl.fileLocation;
            })()

        ]);

        await addFileCacheMapping(videoFileLocation, video.uri);
        await addFileCacheMapping(thumbnailFileLocation, videoThumbnail.uri);
        await this.#client.invokeApi({}, '/sessions/submission/create', 'POST', {}, {
            playerId: playerId,
            sessionNumber: sessionNumber,
            drillId: drillId,
            fileLocation: videoFileLocation,
            thumbnailFileLocation: thumbnailFileLocation,
        });
    }

    createFeedback = async ({coachId, playerId, sessionNumber, drillId, video, videoThumbnail}) => {
        const [videoFileLocation, thumbnailFileLocation] = await Promise.all([
            (async () => {
                const mediaUploadUrl = await this.getMediaUploadUrl(`feedback/${playerId}/${sessionNumber}/${drillId}`)
                await this.uploadFile(video, mediaUploadUrl.uploadUrl);
                return mediaUploadUrl.fileLocation;
            })(),
            (async () => {
                const mediaUploadUrl = await this.getMediaUploadUrl(`feedback/${playerId}/${sessionNumber}/${drillId}/thumbnail`)
                await this.uploadFile(videoThumbnail, mediaUploadUrl.uploadUrl);
                return mediaUploadUrl.fileLocation;
            })()

        ]);
        await addFileCacheMapping(videoFileLocation, video.uri);
        await addFileCacheMapping(thumbnailFileLocation, videoThumbnail.uri);
        await this.#client.invokeApi({}, '/sessions/feedback/create', 'POST', {}, {
            coachId: coachId,
            playerId: playerId,
            sessionNumber: sessionNumber,
            drillId: drillId,
            fileLocation: videoFileLocation,
            thumbnailFileLocation: thumbnailFileLocation,
        });
    }

    uploadDemoVideo = async (drillId, angle, video) => {
        try {
            const mediaUploadUrl = await this.getMediaUploadUrl(`demo/${drillId}/${angle}`);
            await this.uploadFile(video, mediaUploadUrl.uploadUrl);
            return mediaUploadUrl.fileLocation;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    uploadDemoVideoThumbnail = async (drillId, angle, image) => {
        const mediaUploadUrl = await this.getMediaUploadUrl(`demo/${drillId}/${angle}/thumbnail`)
        await this.uploadFile(image, mediaUploadUrl.uploadUrl);
        return mediaUploadUrl.fileLocation;
    }

    getMediaUploadUrl = async (pathPrefix) => {
        const response = await this.#client.invokeApi({}, '/media-upload-url/generate', 'POST', {}, {
            pathPrefix,
        });
        return response.data;
    }

    uploadFile = async (fileRef, uploadUrl) => {
        const file = await fetch(fileRef.uri);
        const blob = await file.blob();
        await fetch(uploadUrl, { method: 'PUT', body: blob });
    }

    stall = async (stallTime = 2000) => {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }
}

export default HttpClient;
