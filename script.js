document.getElementById('generate').addEventListener('click', function() {
    const version = document.getElementById('version').value;
    const commandType = document.getElementById('commandType').value;
    const parameters = document.getElementById('parameters').value;

    let command = '';

    switch (commandType) {
        case 'give':
            command = `/give ${parameters}`;
            break;
        case 'tp':
            command = `/tp ${parameters}`;
            break;
        case 'setblock':
            command = `/setblock ${parameters}`;
            break;
        default:
            command = 'Invalid command type';
    }

    document.getElementById('output').value = command + ' (Version: ' + version + ')';
});
