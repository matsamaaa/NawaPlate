<img src="https://github.com/matsamaaa/NawaPlate/blob/main/banner.png?raw=true">
ㅤ


# NawaPlate

NawaPlate is a Discord template designed to simplify the creation of Discord bots using JavaScript with Node.js. It was initially developed for the [Nawashu](https://nawashu.xyz/) bot by [mat_sama](https://github.com/matsamaaa).

<p align="center">
<img src="https://img.shields.io/badge/version-1.0-05122A?style=for-the-badge">
<img src="https://img.shields.io/github/issues/matsamaaa/NawaPlate.svg?style=for-the-badge">
<img src="https://img.shields.io/github/stars/matsamaaa/NawaPlate.svg?style=for-the-badge">
</p>

## Prerequisites

- Installed MongoDB
- Create two collections in MongoDB: `commandlogs` and `langs`
- Fill out the `.env` file in `/Configs`

### Example content for `.env` file

```env
# ================= TOKENS =================
TOKEN_DISCORD="TOKEN_HERE"

# ================= URLS =================
URL_MONGO_INTERNAL="URL_HERE (ex: mongodb://USERNAME:PASSWORD@DOMAIN_NAME/?authMechanism=DEFAULT&authSource=admin&dbName=DATABASE_NAME)"
URL_MONGO_EXTERNAL="URL_HERE (ex: mongodb://USERNAME:PASSWORD@IP/?authMechanism=DEFAULT&authSource=admin&dbName=DATABASE_NAME)"
```
> [!CAUTION]
> You should never share your .env file, as it contains information that could be misused.

## Installation

```bash
git clone https://github.com/matsamaaa/NawaPlate
cd NawaPlate
npm install --save
```

## Configuration

1. Fill out the `.env` file as shown above.
> [!WARNING]
> 2. Make sure MongoDB is running and the `commandlogs` and `langs` collections are created.

## Used Packages

- [chalk](https://www.npmjs.com/package/chalk) - For coloring console output
- [dateformat](https://www.npmjs.com/package/dateformat) - For date formatting
- [discord-hybrid-sharding](https://www.npmjs.com/package/discord-hybrid-sharding) - For Discord hybrid sharding
- [discord.js](https://www.npmjs.com/package/discord.js) - Main library for interacting with the Discord API
- [dotenv](https://www.npmjs.com/package/dotenv) - For loading environment variables from a `.env` file
- [mongoose](https://www.npmjs.com/package/mongoose) - ODM for MongoDB

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

To run the bot:

```bash
npm start
```

---

© 2024 mat_sama. All rights reserved.
