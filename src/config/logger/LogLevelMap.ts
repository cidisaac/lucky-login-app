export default class LogLevelMap {
    private static levels = ['log', 'error'];

    static getLogLevel(env: string) {

        switch (env) {
            case 'dev': {
                return LogLevelMap.levels;
            }
            case 'local': {
                LogLevelMap.levels.push('debug')
                return LogLevelMap.levels;
            }
            default: {
                return LogLevelMap.levels;
            }
        }
    }
}