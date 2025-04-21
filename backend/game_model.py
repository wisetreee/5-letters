import enum


class GameType(enum.Enum):
    DAILY = 0,
    ENDLESS = 1


class GameModel:
    def __init__(self):
        self.__attempts_by_length = {3: 7, 4: 6, 5: 6, 6: 5, 7: 5, 8: 4, 9: 4, 10: 3}
        self.__reward = {GameType.DAILY: 50, GameType.ENDLESS: 25}

    @property
    def ATTEMPTS_BY_LENGTH(self):
        return self.__attempts_by_length
    
    def get_reward_by_mode(self, game_mode: GameType):
        return self.__reward.get(game_mode, self.__reward[GameType.ENDLESS])