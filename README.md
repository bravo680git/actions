## Bravo680 Telegram notifier v1
An action that helps send message to telegram when a job is finished.

Posted message includes some infomation about job: 
* Repository 
* Branch name
* Workflow name
* Job name and job status

## Using
```yml
name: Test notify action
on:
    push:
        branches: [v1]
jobs:
    TestNotify:
        runs-on: ubuntu-latest
        if: always()
        steps:
            # - any jobs...

            - uses: bravo680git/tele-notify@v1
              with:
                # Telegram channel id - required
                to: ${{ secrets.TELE_CHANNEL_ID }}
                # Telegram chatbot token - required
                token: ${{ secrets.TELE_TOKEN }}
```