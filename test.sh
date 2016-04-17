cordova build --release android

cd /opt/softwares/Android/sdk/platform-tools/

rm android-release-unsigned.apk

rm event.apk

cp /opt/code/ionic/events/platforms/android/build/outputs/apk/android-release-unsigned.apk /opt/softwares/Android/sdk/platform-tools/

cd /opt/softwares/Android/sdk/platform-tools/

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore lanix-key.keystore android-release-unsigned.apk lanix-key

/opt/softwares/Android/sdk/build-tools/23.0.3/zipalign -v 4 android-release-unsigned.apk event.apk

cd /opt/softwares/Android/sdk/platform-tools/

./adb uninstall com.techtik.eventing

./adb install event.apk