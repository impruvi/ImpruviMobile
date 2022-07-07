# Overview
This package contains the code for the Impruvi mobile app.
We use the Expo managed workflow.

# Setup
- Ensure you have node installed (i'm running v16.13.1)
- Install the expo cli `npm install -g expo-cli`
- Install the eas cli `npm install -g eas-cli`
- Run `npm install` in the root of this directory

# Testing
Run `expo start` from your command line. Either scan the QR
code with your phone to load the app onto your phone or press `i`
to load it into the IOS simulator.
Press `r` in that same terminal to refresh the app after making changes

# Building
MAKE SURE YOU HAVE INCREMENTED THE `buildNumber` IN THE `app.json` FILE!
(Submitting to apple connect will fail if you do not and you will waste a lot of time waiting for the build)

Run `eas build --platform ios`
Then `eas submit` and select the build that you had previously created