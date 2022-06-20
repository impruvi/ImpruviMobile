import apiClientFactory from 'aws-api-gateway-client';
import {DrillVideoAngle} from "../constants/drillVideoAngle";
import {UserType} from "../constants/userType";

const VideoTypes = {
    Submission: 'SUBMISSION',
    Feedback: 'FEEDBACK',
    Demo: 'DEMO'
}

class HttpClient {

    #client = apiClientFactory.newClient({
        invokeUrl: 'https://pmpq5sqn7f.execute-api.us-west-2.amazonaws.com/prod',
        region: 'us-west-2',
        accessKey: 'AKIAXTDBP63P4IWBNXM6',
        secretKey: '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',
    });

    validateInviteCode = async (invitationCode) => {
        const response = await this.#client.invokeApi({}, '/validate-invitation-code', 'POST', {}, {
            invitationCode: invitationCode.trim()
        });

        return response.data;
    }

    updatePlayer = async ({playerId, coachId, firstName, lastName, email, availability}) => {
        await this.#client.invokeApi({}, '/player/update', 'POST', {},{
            player: {
                playerId,
                coachId,
                firstName,
                lastName,
                email,
                availability
            }
        });
    }

    updateCoach = async ({coachId, firstName, lastName, email, about, position, school, youthClub, headshot}) => {
        if (!!headshot && !this.isRemoteMedia(headshot)) {
            await this.uploadHeadshot(UserType.Coach, coachId, headshot);
        }
        await this.#client.invokeApi({}, '/coach/update', 'POST', {},{
            coach: {
                coachId,
                firstName,
                lastName,
                email,
                about,
                position,
                school,
                youthClub,
                headshot: {
                    uploadDateEpochMillis: new Date().getTime() // TODO: move updating of this to BE
                }
            }
        });
    }

    getCoach = async (coachId) => {
        const response = await this.#client.invokeApi({}, '/coach/get', 'POST', {},{
            coachId: coachId
        });
        return response.data.coach;
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

        await this.uploadDemoVideos({drillId, frontVideo, sideVideo, closeVideo, frontVideoThumbnail, sideVideoThumbnail, closeVideoThumbnail});
    }

    updateDrill = async ({drillId, coachId, name, description, category, equipment, frontVideo, sideVideo, closeVideo, frontVideoThumbnail, sideVideoThumbnail, closeVideoThumbnail}) => {
        await this.#client.invokeApi({}, '/drills/update', 'POST', {}, {
            drill: {
                drillId: drillId,
                coachId: coachId,
                name: name,
                description: description,
                category: category,
                equipment: equipment
            }
        });

        await this.uploadDemoVideos({drillId, frontVideo, sideVideo, closeVideo, frontVideoThumbnail, sideVideoThumbnail, closeVideoThumbnail});
    }

    deleteDrill = async (drillId) => {
        await this.stall();
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
        const getVideoUploadUrlResponse = await this.#client.invokeApi({}, '/get-video-upload-url', 'POST', {}, {
            videoType: VideoTypes.Submission,
            submissionParams: {
                playerId: playerId,
                sessionNumber: sessionNumber,
                drillId: drillId
            }
        });

        await this.uploadFile(video, getVideoUploadUrlResponse.data.uploadUrl);

        // update submission for drill
        await this.#client.invokeApi({}, '/sessions/submission/create', 'POST', {}, {
            playerId: playerId,
            sessionNumber: sessionNumber,
            drillId: drillId,
        });
    }

    createFeedback = async ({coachId, playerId, sessionNumber, drillId, video}) => {
        const getVideoUploadUrlResponse = await this.#client.invokeApi({}, '/get-video-upload-url', 'POST', {}, {
            videoType: VideoTypes.Feedback,
            feedbackParams: {
                playerId: playerId,
                sessionNumber: sessionNumber,
                drillId: drillId
            }
        });

        await this.uploadFile(video, getVideoUploadUrlResponse.data.uploadUrl);

        // update submission for drill
        await this.#client.invokeApi({}, '/sessions/feedback/create', 'POST', {}, {
            coachId: coachId,
            playerId: playerId,
            sessionNumber: sessionNumber,
            drillId: drillId,
        });
    }

    uploadDemoVideos = async ({drillId, frontVideo, sideVideo, closeVideo, frontVideoThumbnail, sideVideoThumbnail, closeVideoThumbnail}) => {
        await Promise.all([
            !this.isRemoteMedia(frontVideo) ? this.uploadDemoVideo(drillId, DrillVideoAngle.Front, frontVideo) : Promise.resolve(),
            !this.isRemoteMedia(sideVideo) ? this.uploadDemoVideo(drillId, DrillVideoAngle.Side, sideVideo) : Promise.resolve(),
            !this.isRemoteMedia(closeVideo) ? this.uploadDemoVideo(drillId, DrillVideoAngle.Close, closeVideo) : Promise.resolve(),
            !this.isRemoteMedia(frontVideo) ? this.uploadDemoVideoThumbnail(drillId, DrillVideoAngle.Front, frontVideoThumbnail) : Promise.resolve(),
            !this.isRemoteMedia(sideVideo) ? this.uploadDemoVideoThumbnail(drillId, DrillVideoAngle.Side, sideVideoThumbnail) : Promise.resolve(),
            !this.isRemoteMedia(closeVideo) ? this.uploadDemoVideoThumbnail(drillId, DrillVideoAngle.Close, closeVideoThumbnail) : Promise.resolve(),
        ]);
    }

    uploadDemoVideo = async (drillId, angle, video) => {
        const uploadUrl = await this.getDemoVideoUploadUrl(drillId, angle);
        await this.uploadFile(video, uploadUrl);
    }

    uploadDemoVideoThumbnail = async (drillId, angle, image) => {
        const uploadUrl = await this.getDemoVideoThumbnailUploadUrl(drillId, angle);
        await this.uploadFile(image, uploadUrl);
    }

    uploadHeadshot = async (userType, userId, image) => {
        const uploadUrl = await this.getHeadshotUploadUrl(userType, userId);
        await this.uploadFile(image, uploadUrl);
    }

    getDemoVideoUploadUrl = async (drillId, angle) => {
        const response = await this.#client.invokeApi({}, '/get-video-upload-url', 'POST', {}, {
            videoType: VideoTypes.Demo,
            demoParams: {
                drillId: drillId,
                angle: angle
            }
        });
        return response.data.uploadUrl;
    }

    getDemoVideoThumbnailUploadUrl = async (drillId, angle) => {
        const response = await this.#client.invokeApi({}, '/get-video-thumbnail-upload-url', 'POST', {}, {
            videoType: VideoTypes.Demo,
            demoParams: {
                drillId: drillId,
                angle: angle
            }
        });
        return response.data.uploadUrl;
    }

    getHeadshotUploadUrl = async (userType, userId) => {
        const response = await this.#client.invokeApi({}, '/get-headshot-upload-url', 'POST', {}, {
            userType,
            userId
        });
        return response.data.uploadUrl;
    }

    uploadFile = async (fileRef, uploadUrl) => {
        const file = await fetch(fileRef.uri);
        const blob = await file.blob();
        await fetch(uploadUrl, { method: 'PUT', body: blob });
    }

    isRemoteMedia = (video) => {
        // TODO: not sure that this works in all cases
        return video.uri.startsWith('https://');
    }

    stall = async (stallTime = 2000) => {
        await new Promise(resolve => setTimeout(resolve, stallTime));
    }
}

export default HttpClient;
