# Auto Login Chrome Extension

This Chrome extension allows users to automatically log in to a Engaze UI. This extension is developer purpose only.

## Features

- Automatically login from `Login Again` & `Login` page.
- Handles filling in the phone number and password fields.
- Triggers form submission without user intervention.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   ```

2. **Load the Extension into Chrome**:

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" in the top-right corner.
   - Click on "Load unpacked" and select the folder containing the cloned repository.

3. **Pin the Extension**:
   - After loading, pin the extension by clicking the puzzle piece icon in the top-right corner of Chrome, then click the pin icon next to your extension.

## How to Use

- When you click on the extension icon in Chrome, a popup will appear where you can:
  - Enter your **phone number** and **password**.
  - Click the "Login" button to manually trigger the login process.

## Permissions

The extension requires the following permissions:

- **Storage**: To save login credentials temporarily.
- **Active Tab**: To interact with the currently active tab.
- **Scripting**: To inject scripts into the web pages for form filling and submission.

## Content Script

The content script listens for messages from the background script and handles:

- Navigating to the login page.
- Automatically filling out the login form fields.
- Submitting the login form.

## Development

To make modifications to the extension:

1. Modify the relevant JavaScript files for popup, background, or content script.
2. Reload the extension on `chrome://extensions/` after making changes.

## License

MIT License. Feel free to modify and distribute as necessary.

## Author

Motalib Pathan
