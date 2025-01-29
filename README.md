# AWS Console Color Changer

A Chrome extension that helps you visually distinguish between different AWS accounts by adding custom background colors to the AWS Management Console header.

## Features

- Set custom background colors for AWS Console headers based on account IDs
- Colors persist across browser sessions
- Easy-to-use popup interface
- Automatically detects current AWS account ID
- Works on all AWS Console pages
- Visual distinction helps prevent mistakes when working with multiple accounts

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the extension
4. Open Chrome and go to `chrome://extensions/`
5. Enable "Developer mode" in the top right
6. Click "Load unpacked" and select the `dist` folder

## Usage

1. Click the extension icon in your browser toolbar
2. Enter an AWS Account ID
3. Select a color for that account
4. Click "Add / Update" to save
5. The AWS Console will now display with your chosen background color when you're logged into that account

## Development

- Built with HTML, CSS, and JavaScript
- Uses Chrome Extension Manifest V3
- Manages state with Chrome Storage API

## License

MIT License
