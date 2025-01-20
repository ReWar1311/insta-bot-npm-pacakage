# insta-bot

A powerful and flexible Node.js package to automate various Instagram activities like liking posts, following users, commenting, sharing, and uploading posts. Built using Puppeteer, this bot interacts directly with Instagram's web interface, offering fine control over automation tasks.

## Features

- **Login Automation**: Log in to Instagram using credentials.
- **Like Posts**: Automatically like specified posts.
- **Follow Users**: Follow users on Instagram with a simple command.
- **Comment on Posts**: Post comments on targeted Instagram posts.
- **Share Posts**: Automate sharing of posts.
- **Upload Posts**: Upload images with captions and tags.

## Installation

To use the `insta-bot`, ensure you have [Node.js](https://nodejs.org/) installed, then install the package using npm:

```bash
npm install insta-bot
```

## Usage

### Basic Example

```javascript
import instaBot from "insta-bot";

const bot = new instaBot();

// Authenticate with your Instagram credentials
bot.authenticate("your_username", "your_password");

// Perform actions
bot.like("https://www.instagram.com/p/POST_URL/"); // Like a post
bot.follow("https://www.instagram.com/USER_URL/"); // Follow a user
bot.comment("https://www.instagram.com/p/POST_URL/", "Nice try diddy"); // Comment on a post
bot.upload("/path/to/image.jpg", "My first automated post!", ["#automation", "#puppeteer"]); // Upload a post

// Start the bot
bot.run();
```

## API Reference

### **Methods**

1. **`authenticate(username, password)`**
   - Authenticate the bot with your Instagram credentials.
   - **Parameters**:
     - `username` (string): Instagram username.
     - `password` (string): Instagram password.

2. **`like(url)`**
   - Like a specific Instagram post.
   - **Parameters**:
     - `url` (string): URL of the post to like.

3. **`follow(url)`**
   - Follow a specific user on Instagram.
   - **Parameters**:
     - `url` (string): Profile URL of the user to follow.

4. **`comment(url, value)`**
   - Comment on a specific Instagram post.
   - **Parameters**:
     - `url` (string): URL of the post to comment on.
     - `value` (string): The text of the comment.

5. **`upload(file, caption, tags)`**
   - Upload a new post to Instagram.
   - **Parameters**:
     - `file` (string): Path to the image file.
     - `caption` (string): Caption for the post.
     - `tags` (array): Array of tags for the post.

6. **`run()`**
   - Start executing the bot with the defined tasks.

## Prerequisites

- **Node.js**: Ensure Node.js version 16 or later is installed.
- **Puppeteer**: Puppeteer launches a Chromium browser instance, so ensure your environment supports it.

## Notes

- **Headless Mode**: By default, the bot runs with `headless: false` to visualize the browser. You can modify this in the source code for a headless operation.
- **Delays and Randomization**: The bot includes delays to mimic human-like behavior, reducing the chances of being flagged by Instagram.

## Limitations

- Use responsibly to avoid violating Instagram's terms of service.
- Avoid running the bot excessively to prevent account suspension.

## Contributing

Contributions are welcome! If you encounter any bugs or have feature suggestions, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This package is for educational purposes only. Use it at your own risk. The author is not responsible for any misuse or account bans resulting from using this bot.
