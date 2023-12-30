echo "switching to branch main"
git checkout main

echo "Building app.."
npm run build

echo "Deploying file to server..."
scp -r build/* root@69.55.55.245:/var/www/69.55.55.245/

echo "Done!"
