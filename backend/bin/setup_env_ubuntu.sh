python3 -m venv venv
activate() {
    . venv/Scripts/activate
    echo "installing requirements to virtual environment"
    pip install -r packages.txt
}
activate