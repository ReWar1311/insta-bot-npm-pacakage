import puppeteer from "puppeteer";

async function startbot(params) {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: false, // Visible browser
      slowMo: 50, // Adds slight delay for visibility
      defaultViewport: null, // Normal viewport size
      args: ["--start-maximized"], // Maximize the browser window
    });

    const page = await browser.newPage();

    try {
      // Open Instagram login page
      console.log("Navigating to Instagram login page...");
      await page.goto("https://www.instagram.com/accounts/login/", {
        waitUntil: "networkidle2",
      });

      // Wait for login form to load
      console.log("Waiting for login form...");
      await page.waitForSelector('input[name="username"]', { timeout: 10000 });

      // Enter username and password (replace with your credentials)
      console.log("Filling login credentials...");
      await page.type('input[name="username"]', params.username, {
        delay: Math.floor(Math.random() * 100),
      });
      await page.type('input[name="password"]', params.password, {
        delay: Math.floor(Math.random() * 100),
      });
      await new Promise(function (resolve) {
        setTimeout(resolve, Math.floor(Math.random() * 1000));
      });
      // Click the login button
      console.log("Submitting login form...");
      await page.click('button[type="submit"]');

      // Wait for navigation or error
      try {
        await page.waitForNavigation({
          timeout: 20000,
          waitUntil: "networkidle2",
        });
        console.log("Login navigation complete.");
        const isLoggedIn = await page.$('svg[aria-label="Home"]');
        await new Promise(function (resolve) {
          setTimeout(resolve, Math.floor(Math.random() * 1000));
        });

        if (isLoggedIn) {
          for (let i = 0; i < params.task.length; i++) {
            if (params.task[i].todo == "like") {
              console.log("Starting to like a post...");
              await page.goto(params.task[i].url, {
                waitUntil: "networkidle2",
              });
              console.log("Post loaded successfully!");
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
              const likeButton = await page.waitForSelector(
                'div[role="button"][tabindex="0"] svg[aria-label="Like"]'
              );
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
              await likeButton.click();
              console.log("Post liked successfully!");
              await new Promise(function (resolve) {
                setTimeout(resolve, 3 + Math.floor(Math.random() * 2000));
              });
            }

            if (params.task[i].todo == "follow") {
              console.log("Starting to follow a user...");
              await page.goto(params.task[i].url, {
                waitUntil: "networkidle2",
              });
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
              console.log("User loaded successfully!");
              var buttons = await page.$$('button[type="button"]');
              for (const button of buttons) {
                const text = await page.evaluate(
                  (el) => el.textContent.trim(),
                  button
                );
                if (text === "Follow") {
                  await button.click();
                  console.log("User followed successfully!");
                  await page.evaluate(async () => {
                    await new Promise(function (resolve) {
                      setTimeout(resolve, 3 + Math.floor(Math.random() * 2000));
                    });
                  });

                  break;
                } else if (text === "Following") {
                  console.log("Already following the user!");
                  break;
                }
              }
              await new Promise(function (resolve) {
                setTimeout(resolve, 3 + Math.floor(Math.random() * 2000));
              });
            }
            if (params.task[i].todo == "comment") {
              console.log("Starting to comment on a post...");
              await page.goto(params.task[i].url, {
                waitUntil: "networkidle2",
              });
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
              const textarea = await page.waitForSelector(
                'textarea[aria-label="Add a comment…"]'
              );
              await textarea.type(params.task[i].value, {
                delay: Math.floor(Math.random() * 100),
              });
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
              await page.keyboard.press("Enter");
              console.log("Comment posted successfully!");
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
            }
            if (params.task[i].todo == "upload") {
              console.log("Login successful!");
              console.log("Starting to upload a post...");
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
              await page.click('svg[aria-label="New post"]');
              //   await page.click('svg[aria-label="Post"]');
              const fileInputSelector = 'input._ac69[type="file"]'; // Use the correct selector for your input element
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
              await page.waitForSelector(fileInputSelector);
              // const filePath = ''; // Replace with the actual file path
              const fileInput = await page.$(fileInputSelector);
              if (!fileInput) {
                console.error("File input element not found.");
              }
              await fileInput.uploadFile(params.task[i].file);

              var buttons = await page.$$('div[role="button"][tabindex="0"]');
              for (const button of buttons) {
                const text = await page.evaluate(
                  (el) => el.textContent.trim(),
                  button
                );
                if (text === "Next") {
                  await button.click();
                  break;
                }
              }
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
              buttons = await page.$$('div[role="button"][tabindex="0"]');
              for (const button of buttons) {
                const text = await page.evaluate(
                  (el) => el.textContent.trim(),
                  button
                );
                if (text === "Next") {
                  await button.click();
                  break;
                }
              }
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 1000));
              });
              // Wait for the contenteditable element
              const selector =
                'div[aria-label="Write a caption..."][contenteditable="true"]';
              await page.waitForSelector(selector);

              // Focus on the element
              await page.focus(selector);

              // Type into the element
              const textToType = params.task[i].caption;
              await page.type(selector, textToType, {
                delay: Math.floor(Math.random() * 100),
              });
              await page.evaluate(async () => {
                await new Promise(function (resolve) {
                  setTimeout(resolve, 5000);
                });
              }); // Waits for 5 seconds (5000 milliseconds)
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 3000));
              });
              buttons = await page.$$('div[role="button"][tabindex="0"]');
              for (const button of buttons) {
                const text = await page.evaluate(
                  (el) => el.textContent.trim(),
                  button
                );
                if (text === "Share") {
                  await button.click();
                  break;
                }
              }
              console.log("Post uploaded successfully!");
              await new Promise(function (resolve) {
                setTimeout(resolve, Math.floor(Math.random() * 5000));
              });
              await page.click('svg[aria-label="Home"]');
              console.log("Home page loaded successfully!");
            }
          }
        }
      } catch (navError) {
        // Check if login was successful
        const isLoggedIn = await page.$('svg[aria-label="Home"]');
        if (isLoggedIn) {
          console.log("");
        } else {
          console.log("Login failed: Wrong Credentials");
        }
        console.error(
          "Navigation after login failed or took too long:",
          navError.message
        );

        // Check for login error message
        const loginError = await page.$('p[data-testid="login-error-message"]');
        if (loginError) {
          const errorMessage = await page.evaluate(
            (el) => el.textContent,
            loginError
          );
          console.error("Instagram login error:", errorMessage);
        } else {
          console.error("No explicit login error message found.");
        }
      }
    } catch (loginError) {
      console.error("Error during login process:", loginError.message);
    }
  } catch (err) {
    console.error("Unexpected error occurred:", err.message);
  }
}


class instaBot {
  inputs= {
    username: "",
    password: "",
    task: []};
  authenticate(username,password) {
    this.inputs.username = username;
    this.inputs.password = password;
  }
  like(url) {
    this.inputs.task.push({ todo: "like", url: url });
  }
  follow(url) {
    this.inputs.task.push({ todo: "follow", url: url });
  }
  comment(url, value) {
    this.inputs.task.push({ todo: "comment", url: url, value: value });
  }
  share(url) {
    this.inputs.task.push({ todo: "share", url: url });
  }
  upload(file, caption, tags) {
    this.inputs.task.push({
      todo: "upload",
      file: file,
      caption: caption,
      tags: tags,
    });
  }
  run() {
    if (this.inputs.username == "" || this.inputs.password == "") {
      console.error("Please provide username and password");
    } else {
      startbot(this.inputs);
    }
  }
}

export default instaBot;