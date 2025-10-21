#!/bin/bash
echo "Running admin user seeding script..."
cd "$(dirname "$0")/.."
npm run seed:admin
