import * as Analytics from "expo-firebase-analytics";

class GoogleAnalyticsClient {
    sendGeneralEvent(action) {
        if (!__DEV__) {
            Analytics.logEvent(action, {});
        }
    }

    sendPurchaseSubscriptionEvent(value) {
        if (!__DEV__) {
            Analytics.logEvent("purchase", {
                value: value
            });
        }
    }
}

export default GoogleAnalyticsClient;
