# Next App Design Process

- Identify all the different routes
- make path helper functions
- create routing folders with page.tsx files based on step 1
- identify the places where data changes in your app
- make empty server actions for each of those
- add comments on watch paths you'll need to revalidate for each server action

# Reasons

As we went to application in production mode, we saw quickly what we had some very strange behavior we started to deploy our app, thanks to the root cache mechanism.
