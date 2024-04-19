#!/bin/bash

# Check if the virtual environment for backend exists
if [ ! -d "backend/venv" ]; then
    echo "Creating virtual environment for backend..."
    cd backend || exit
    python3 -m venv venv

    # Activate the virtual environment and install backend dependencies
    source venv/bin/activate
    
    pip install --upgrade pip
    pip install -r requirements.txt

    # Deactivate the virtual environment
    deactivate
    cd ..
    echo "Backend virtual environment created and dependencies installed."
else
    echo "Backend virtual environment already exists."
fi

# Check if the node modules for frontend exists
if [ ! -d "frontend/node_modules" ]; then
	# Install frontend dependencies
	echo "Installing frontend dependencies..."
	cd frontend || exit
	npm install
	cd ..
	echo "Frontend dependencies installed."
else
    echo "Frontend dependencies already exists."
fi



