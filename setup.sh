#!/usr/bin/env bash

ROOT_DIR=$(pwd)

# Function to install Python dependencies
install_pip_dependencies() {
    local project_directory=$1
    # Check if a virtual environment already exists
    if [ ! -d "$project_directory/venv" ]; then
        echo "Creating virtual environment at $project_directory..."
        cd "$project_directory" || exit
        python3 -m venv venv || py -m venv venv

        # Activate the virtual environment and install backend dependencies
        source venv/bin/activate || . venv/Scripts/activate
        pip install --upgrade pip
        pip install -r requirements.txt || { echo "Failed to install Python dependencies for $project_directory"; exit 1; }

        # Deactivate the virtual environment
        deactivate || { echo "Failed to deactivate virtual environment for $project_directory"; exit 1; }
        cd "$ROOT_DIR" || exit
        echo "Python dependencies installed for $project_directory."
    else
        echo "$project_directory: virtual environment already exists."
    fi
}

# Function to install Node.js dependencies
install_node_dependencies() {
    local project_directory=$1
    # Check if node_modules already exist
    if [ ! -d "$project_directory/node_modules" ]; then
        # Install dependencies
        echo "Installing dependencies for $project_directory..."
        cd "$project_directory" || exit
        npm install || { echo "Failed to install Node.js dependencies for $project_directory"; exit 1; }
        cd "$ROOT_DIR" || exit
        echo "Dependencies installed for $project_directory."
    else
        echo "$project_directory: dependencies already exist."
    fi
}

# Check if Python command is available
if command -v python3 &> /dev/null || command -v py &> /dev/null ; then
    echo "Python found."
    # Check if backend directory exists
    if [ -d "backend" ]; then
        # Install backend dependencies
        install_pip_dependencies "backend"
    else
        echo "Error: 'backend' directory not found."
    fi
else
    echo "Python not found. Exiting."
    exit 1
fi

# Check if npm command is available
if command -v npm &> /dev/null; then
    echo "npm found."
    # Check if frontend directory exists
    if [ -d "frontend" ]; then
        # Install frontend dependencies
        install_node_dependencies "frontend"
    else
        echo "Error: 'frontend' directory not found."
    fi

else
    echo "npm not found. Please install Node.js and npm to continue."
    exit 1
fi

# Wait for user input to exit
read -rp "Press Enter to exit..." input

