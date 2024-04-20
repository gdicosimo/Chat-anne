#!/usr/bin/env bash

# Check if Python command is available
if command -v python3 &> /dev/null || command -v py &> /dev/null ; then
    echo "You have Python!"
    if [ ! -d "backend/venv" ]; then
	    echo "Creating virtual environment for backend..."
	    cd backend || exit
	    python3 -m venv venv || py -m venv venv

	    # Activate the virtual environment and install backend dependencies
	    source venv/bin/activate || call venv/Scripts/activate
	    
	    pip install --upgrade pip
	    pip install -r requirements.txt

	    # Deactivate the virtual environment
	    deactivate
	    cd ..
	    echo "Backend virtual environment created and dependencies installed."
	else
	    echo "Backend virtual environment already exists."
	fi
else
    echo "You don't have Python. Exiting."
    exit 1
fi

# Check if the node modules for frontend exist
if [ ! -d "frontend/node_modules" ]; then
    # Install frontend dependencies
    echo "Installing frontend dependencies..."
    cd frontend || exit
    npm i vite@latest
    cd ..
    echo "Frontend dependencies installed."
else
    echo "Frontend dependencies already exist."
fi

