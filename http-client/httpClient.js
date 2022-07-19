import apiClientFactory from 'aws-api-gateway-client';
import {DrillVideoAngle} from "../constants/drillVideoAngle";
import {isRemoteMedia} from '../util/fileUtil';

class HttpClient {

    #client = apiClientFactory.newClient({
        invokeUrl: 'https://pmpq5sqn7f.execute-api.us-west-2.amazonaws.com/prod',
        region: 'us-west-2',
        accessKey: 'AKIAXTDBP63P4IWBNXM6',
        secretKey: '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',
    });

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
            if (err.response.status === 403) {
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
        const player = {
            playerId,
            coachId,
            firstName,
            lastName,
            email,
            headshot
        }

        if (!!headshot && !!headshot.uri && !isRemoteMedia(headshot)) {
            const mediaUploadUrl = await this.getMediaUploadUrl('player/headshot');
            await this.uploadFile(headshot, mediaUploadUrl.uploadUrl);
            player.headshot = {
                fileLocation: mediaUploadUrl.fileLocation,
                uploadDateEpochMillis: new Date().getTime() // TODO: move updating of this to BE
            }
        }

        await this.#client.invokeApi({}, '/player/update', 'POST', {},{
            player: player
        });
        return await this.getPlayer(playerId);
    }

    updateCoach = async ({coachId, firstName, lastName, email, about, position, school, youthClub, headshot}) => {
        const coach = {
            coachId,
            firstName,
            lastName,
            email,
            about,
            position,
            school,
            youthClub,
            headshot
        }
        if (!!headshot && !!headshot.uri && !isRemoteMedia(headshot)) {
            const mediaUploadUrl = await this.getMediaUploadUrl('coach/headshot');
            await this.uploadFile(headshot, mediaUploadUrl.uploadUrl);
            coach.headshot = {
                fileLocation: mediaUploadUrl.fileLocation,
                uploadDateEpochMillis: new Date().getTime() // TODO: move updating of this to BE
            }
        }
        await this.#client.invokeApi({}, '/coach/update', 'POST', {},{
            coach: coach
        });
        const updatedCoach = await this.getCoach(coachId);
        return updatedCoach;
    }

    getCoach = async (coachId) => {
        const response = await this.#client.invokeApi({}, '/coach/get', 'POST', {},{
            coachId: coachId
        });
        return response.data.coach;
    }

    getPlayer = async (playerId) => {
        const response = await this.#client.invokeApi({}, '/player/get', 'POST', {},{
            playerId: playerId
        });
        return response.data.player;
    }

    getPlayerSessions = async (playerId) => {
        const response = await this.#client.invokeApi({}, '/sessions/player/get', 'POST', {}, {
            playerId: playerId
        });

        return response.data.sessions;
    }

    getCoachSessions = async (coachId) => {
        const response = await this.#client.invokeApi({}, '/sessions/coach/get', 'POST', {}, {
            coachId: coachId
        });

        return response.data.playerSessions;
    }

    createDrill = async ({coachId, name, description, category, equipment, frontVideo, sideVideo, closeVideo, frontVideoThumbnail, sideVideoThumbnail, closeVideoThumbnail}) => {
        const createDrillResponse = await this.#client.invokeApi({}, '/drills/create', 'POST', {}, {
            drill: {
                coachId: coachId,
                name: name,
                description: description,
                category: category,
                equipment: equipment
            }
        });

        const drillId = createDrillResponse.data.drill.drillId;
        await this.updateDrill({drillId, coachId, name, description, category, equipment, frontVideo, sideVideo, closeVideo, frontVideoThumbnail, sideVideoThumbnail, closeVideoThumbnail})
    }

    updateDrill = async ({drill, drillId, coachId, name, description, category, equipment, frontVideo, sideVideo, closeVideo, frontVideoThumbnail, sideVideoThumbnail, closeVideoThumbnail}) => {
        const [
            frontVideoFileLocation,
            sideVideoFileLocation,
            closeVideoFileLocation,
            frontVideoThumbnailFileLocation,
            sideVideoThumbnailFileLocation,
            closeVideoThumbnailFileLocation
        ] = await this.uploadDemoVideos({
            drillId,
            frontVideo,
            sideVideo,
            closeVideo,
            frontVideoThumbnail,
            sideVideoThumbnail,
            closeVideoThumbnail
        });

        const currentTime = new Date().getTime() // TODO: move updating of this to BE
        await this.#client.invokeApi({}, '/drills/update', 'POST', {}, {
            drill: {
                drillId: drillId,
                coachId: coachId,
                name: name,
                description: description,
                category: category,
                equipment: equipment,
                demos: {
                    front: !!frontVideoFileLocation ? {fileLocation: frontVideoFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.front,
                    side: !!sideVideoFileLocation ? {fileLocation: sideVideoFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.side,
                    close: !!closeVideoFileLocation ? {fileLocation: closeVideoFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.close,
                    frontThumbnail: !!frontVideoThumbnailFileLocation ? {fileLocation: frontVideoThumbnailFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.frontThumbnail,
                    sideThumbnail: !!sideVideoThumbnailFileLocation ?  {fileLocation: sideVideoThumbnailFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.sideThumbnail,
                    closeThumbnail: !!closeVideoThumbnailFileLocation ? {fileLocation: closeVideoThumbnailFileLocation, uploadDateEpochMillis: currentTime} : drill.demos.closeThumbnail,
                }
            }
        });
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
        await this.#client.invokeApi({}, '/sessions/update', 'POST', {}, {
            session: {
                playerId: playerId,
                sessionNumber: sessionNumber,
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

    deleteSession = async ({playerId, sessionNumber}) => {
        await this.#client.invokeApi({}, '/sessions/delete', 'POST', {}, {
            playerId: playerId,
            sessionNumber: sessionNumber,
        });
    }

    createSubmission = async (playerId, sessionNumber, drillId, video) => {
        const mediaUploadUrl = await this.getMediaUploadUrl(`${playerId}/${sessionNumber}/${drillId}/submission`)
        await this.uploadFile(video, mediaUploadUrl.uploadUrl);
        await this.#client.invokeApi({}, '/sessions/submission/create', 'POST', {}, {
            playerId: playerId,
            sessionNumber: sessionNumber,
            drillId: drillId,
            fileLocation: mediaUploadUrl.fileLocation
        });
    }

    createFeedback = async ({coachId, playerId, sessionNumber, drillId, video}) => {
        const mediaUploadUrl = await this.getMediaUploadUrl(`${playerId}/${sessionNumber}/${drillId}/feedback`)

        await this.uploadFile(video, mediaUploadUrl.uploadUrl);

        await this.#client.invokeApi({}, '/sessions/feedback/create', 'POST', {}, {
            coachId: coachId,
            playerId: playerId,
            sessionNumber: sessionNumber,
            drillId: drillId,
            fileLocation: mediaUploadUrl.fileLocation
        });
    }

    uploadDemoVideos = async ({drillId, frontVideo, sideVideo, closeVideo, frontVideoThumbnail, sideVideoThumbnail, closeVideoThumbnail}) => {
        return await Promise.all([
            !isRemoteMedia(frontVideo) ? this.uploadDemoVideo(drillId, DrillVideoAngle.Front, frontVideo) : Promise.resolve(),
            !isRemoteMedia(sideVideo) ? this.uploadDemoVideo(drillId, DrillVideoAngle.Side, sideVideo) : Promise.resolve(),
            !isRemoteMedia(closeVideo) ? this.uploadDemoVideo(drillId, DrillVideoAngle.Close, closeVideo) : Promise.resolve(),
            !isRemoteMedia(frontVideo) ? this.uploadDemoVideoThumbnail(drillId, DrillVideoAngle.Front, frontVideoThumbnail) : Promise.resolve(),
            !isRemoteMedia(sideVideo) ? this.uploadDemoVideoThumbnail(drillId, DrillVideoAngle.Side, sideVideoThumbnail) : Promise.resolve(),
            !isRemoteMedia(closeVideo) ? this.uploadDemoVideoThumbnail(drillId, DrillVideoAngle.Close, closeVideoThumbnail) : Promise.resolve(),
        ]);
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
