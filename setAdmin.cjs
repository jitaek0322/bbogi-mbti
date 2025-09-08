const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = "aJC5zaii8NRRENTgKGZqJDSf3qV2"; // Firebase 콘솔 → Authentication → 사용자 → UID 복사

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("✅ 관리자 권한 부여 완료!");
    process.exit();
  })
  .catch(err => {
    console.error("❌ 에러 발생:", err);
    process.exit(1);
  });
