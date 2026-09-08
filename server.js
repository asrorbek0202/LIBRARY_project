const mongodb = require("mongodb");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

const client = new mongodb.MongoClient(process.env.MONGO_URL);

async function main() {
  try {
    await client.connect();
    console.log("MongoDB (Library) bazasiga muvaffaqiyatli ulandik!");

    module.exports = client;

    const app = require("./app");
    const server = http.createServer(app);
    const PORT = process.env.PORT || 3001;

    server.listen(PORT, () => {
      console.log(`Server ishga tushdi: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB ulanishda xatolik yuz berdi:", err);
    process.exit(1);
  }
}

main();