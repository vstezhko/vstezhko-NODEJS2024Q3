function parseArgs(args) {
    const parsed = {};

    args.forEach(arg => {
        if (arg.startsWith('--')) {
            const [key, value] = arg.slice(2).split('=');
            parsed[key] = value || true;
        }
    });

    return parsed;
}

module.exports = parseArgs;