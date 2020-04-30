/**
 * Проверка значения на int
 * 
 * @param {type} val 
 *   Проверяемое значение
 * @returns {boolean}
 *   Результат проверки
 */
function isInt(val) {
    var result = false;
    if (Math.floor(val).toString() === val && jQuery.isNumeric(val)) {
        result = true;
    }
    return result;
}

/**
 * Является ли число положительным
 * 
 * @param {type} val
 *   Проверяемое значение
 * @returns {boolean}
 *   Результат проверки
 */
function numPositive(val) {
    var result = false;
    if (val >= 0) {
        result = true;
    }
    return result;
}

/**
 * Конвертирует строковые значения массива в целочисленные
 * 
 * @param {array} arr
 *   Входной массив
 * @returns {array}
 *   Целочисленный массив
 */
function convertArrayToInt(arr) {
    if (Array.isArray(arr)) {
        var output = arr.map(function (item) {
            return parseInt(item);
        });
    } else {
        output = arr;
    }
    return output;
}

/**
 * Возвращает значение атрибута value
 * 
 * @param {string} selector
 *   Селектор
 * @returns {string}
 *   Значение элемента формы
 */
function getVal(selector) {
    return jQuery(selector).val();
}

/**
 * Возвращает размер игрового поля
 * 
 * @returns {string}
 *   Размер игрового поля
 */
function getSizeBoard() {
    return getVal('#sizeBoard');
}

/**
 * Возвращает количество шашек для каждого игрока
 * 
 * @returns {string}
 *   Количество шашек игрока
 */
function getCountCheckers() {
    return getVal('#countCheckers');
}

/**
 * Возвращает допустимый алфавит для игровой доски
 * 
 * @returns {string}
 *   Допустимый алфавит
 */
function getAlphabet() {
    var alphabet = 'ABCDEFGHI';
    return alphabet;
}

/**
 * Возвращает максимальный размер игрового поля
 * 
 * @returns {int}
 *   Максимальная размерность игрового поля
 */
function getMaxSizeBoard() {
    var alphabet = getAlphabet();
    return alphabet.length;
}

/**
 * Проверяет размер игрового поля с максимально допустимым значением
 * 
 * @param {int} size
 *   Размер игрового поля
 * @returns {boolean}
 *   Результат проверки
 */
function checkMaxSizeBoard(size) {
    size = parseInt(size);
    var result = true;
    var maxsize = getMaxSizeBoard();
    if (size > maxsize) {
        result = false;
    }
    return result;
}

/**
 * Проверяет количество шашек игрока с максимально допустимым значением
 * 
 * @param {int} size
 *   Размер игрового поля
 * @param {int} count
 *   Количество шашек игрока
 * @returns {boolean}
 *   Результат проверки
 */
function checkMaxCountCheckers(size, count) {
    size = parseInt(size);
    count = parseInt(count);
    var result = true;
    var dim = size * size; // Количество ячеек на игровом поле MxM
    var maxcount;
    if (dim % 2 === 0) {
        maxcount = (dim - size * 2) / 2;
    } else {
        maxcount = (dim - size) / 2;
    }
    if (count > maxcount) {
        result = false;
    }
    return result;
}

/**
 * Реализует игровое поле
 * 
 * @param {string} container
 *   Селектор контейнера для игрового поля
 * @param {int} dim
 *   Размер игрового поля
 * @param {int} cnt
 *   Количество шашек игрока
 * @returns {object}
 *   Игровое поле
 */
function Board(container, dim, cnt) {
    var self = this;            // Текущий объект
    self.container = container; // Селектор контейнера для игрового поля
    self.white_checker = 'white_checker'; // Класс белых шашек
    self.black_checker = 'black_checker'; // Класс черных шашек
    self.this_checker = '';      // Класс шашки текущего игрока
    self.selected = 'selected'; // Класс выбранной шашки
    self.size = parseInt(dim);  // Размер игрового поля
    self.count = parseInt(cnt); // Количество шашек игрока
    self.statesBoard = [];      // Состояния ячеек игровой доски
    self.selectChecker = null;  // Выбранная шашка
    self.sideChecker = null;    // Выбранная сторона (кому принадлежит шашка)
    self.gameEnd = false;       // Игра завершена
    self.winner = null;            // Победитель

    /**
     * Возвращает размер игрового поля
     * 
     * @returns {int}
     */
    self.getSize = function () {
        return self.size;
    };

    /**
     * Возвращает количество шашек для одного игрока
     * 
     * @returns {int}
     */
    self.getCount = function () {
        return self.count;
    };

    /**
     * Запоминает состояния игровой доски
     * 
     * @param {array} statesBoard
     *    Cостояния игровой доски
     */
    self.setStatesBoard = function (statesBoard) {
        self.statesBoard = statesBoard;
    };

    /**
     * Получает состояния игровой доски
     */
    self.getStatesBoard = function () {
        return self.statesBoard;
    };

    /**
     * Запоминает координаты выбранной шашки
     * 
     * @param {array} indexes
     *    Координаты выбранной шашки
     */
    self.setSelectChecker = function (indexes) {
        self.selectChecker = indexes;
    };

    /**
     * Получает координаты выбранной шашки
     */
    self.getSelectChecker = function () {
        return self.selectChecker;
    };

    /**
     * Запоминает сторону выбранной шашки
     * 
     * @param {array} classname
     *   Класс выбранной стороны
     */
    self.setSideChecker = function (classname) {
        self.sideChecker = classname;
    };

    /**
     * Получает сторону выбранной шашки
     */
    self.getSideChecker = function () {
        return self.sideChecker;
    };

    /**
     * Получает противоположную сторону выбранной шашки
     */
    self.getSideCheckerRival = function () {
        var sideCheckerRival = 0;
        if (self.sideChecker === 1) {
            sideCheckerRival = 2;
        } else if (self.sideChecker === 2) {
            sideCheckerRival = 1;
        }
        return sideCheckerRival;
    };

    /**
     * Смена хода для другого игрока
     */
    self.changeSideChecker = function () {
        self.setSideChecker(self.getSideCheckerRival());
    };

    /**
     * Создает белые шашки в массиве состояний ячеек
     */
    self.createWhiteCheckers = function () {
        var statesBoard = self.getStatesBoard();
        var size = self.getSize();
        var cnt = self.getCount();
        for (var i = size - 1; i >= 0; i--) {
            for (var j = size - 1; j >= 0; j--) {
                if (cnt > 0) {
                    statesBoard[i][j] = 1;
                    cnt--;
                }
            }
        }
        self.setStatesBoard(statesBoard);
    };

    /**
     * Создает черные шашки в массиве состояний ячеек
     */
    self.createBlackCheckers = function () {
        var statesBoard = self.getStatesBoard();
        var size = self.getSize();
        var cnt = self.getCount();
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (cnt > 0) {
                    statesBoard[i][j] = 2;
                    cnt--;
                }
            }
        }
        self.setStatesBoard(statesBoard);
    };

    /**
     * Инициализация состояний ячеек игровой доски
     * Представляет из себя двумерный массив, где:
     * 0 - ячейка пустая
     * 1 - ячейка занята первым (белым) игроком
     * 2 - ячейка занята вторым (черным) игроком
     */
    self.initStatesBoard = function () {
        var statesBoard = self.getStatesBoard();
        var size = self.getSize();
        for (var i = 0; i < size; i++) {
            statesBoard[i] = [];
            for (var j = 0; j < size; j++) {
                statesBoard[i][j] = 0;
            }
        }
        self.setStatesBoard(statesBoard);
        self.createWhiteCheckers();
        self.createBlackCheckers();
        // Проверка окончания игры
        self.gameOver();
        // Сообщение пользователю
        self.showMessage();

    };

    /**
     * Формирует тег div с указанным классом
     * 
     * @param {string} classname
     *   Класс
     * @returns {string}
     *   Сформированный тег
     */
    self.createDivByClass = function (classname) {
        var result = '<div class="' + classname + '"></div>';
        return result;
    };

    /**
     * Добавляет содержимое рядом блочным элементом
     * 
     * @param {string} classparent
     *   Класс родительского элемента
     * @param {string} html
     *   Добавляемый контент
     */
    self.htmlAppend = function (classparent, html) {
        classparent = classparent.replace(' ', '.');
        jQuery('.' + classparent).append(html);
    };

    /**
     * Заменяет содержимое в блочном элементе
     * 
     * @param {string} classparent
     *   Класс родительского элемента
     * @param {string} html
     *   Добавляемый контент
     */
    self.htmlReplace = function (classparent, html) {
        classparent = classparent.replace(' ', '.');
        jQuery('.' + classparent).html(html);
    };

    /**
     * Заменяет содержимое в группе блочных элементов
     * 
     * @param {string} classname
     *   Класс родительских элементов
     * @param {string} html
     *   Добавляемый контент
     */
    self.htmlReplaceEach = function (classname, html) {
        jQuery('.' + classname).each(function () {
            jQuery(this).html(html);
        });
    };

    /**
     * Отрисовка игрового поля
     */
    self.drawBoard = function () {
        // Инициализируем состояния ячеек игровой доски
        self.initStatesBoard();
        var size = self.getSize();

        // Обертка игрового поля
        var chess_wrapper = 'chess__wrapper';
        var chess_wrapper_div = self.createDivByClass(chess_wrapper);
        self.htmlReplace(container, chess_wrapper_div);

        // Игровое поле
        var chess_board = 'chess__board';
        var chess_board_div = self.createDivByClass(chess_board);
        self.htmlReplace(chess_wrapper, chess_board_div);

        // Строки ячеек
        var chess_board_row = 'chess__board-row';
        var chess_board_row_div = '';
        for (var i = 0; i < size; i++) {
            chess_board_row_div += self.createDivByClass(chess_board_row);
        }
        self.htmlReplace(chess_board, chess_board_row_div);

        // Ячейки
        var chess_board_element = 'chess__board-element';
        var chess_board_element_div = '';
        for (var i = 0; i < size; i++) {
            chess_board_element_div += self.createDivByClass(chess_board_element);
        }
        self.htmlReplaceEach(chess_board_row, chess_board_element_div);

        // Место для шашек в ячейках
        var chess_board_element_wrapper = 'chess__board-element-wrapper';
        var chess_board_element_wrapper_div = self.createDivByClass(chess_board_element_wrapper);
        self.htmlReplaceEach(chess_board_element, chess_board_element_wrapper_div);

        // Обертка координат ячеек
        var chess_signs = 'chess__signs';
        var chess_signs_div = self.createDivByClass(chess_signs);
        self.htmlAppend(chess_wrapper, chess_signs_div);

        // Подписи числовых координат ячеек
        var signs_numbers = 'chess__signs-numbers chess__signs-numbers--';
        // Подписи символьних координат ячеек
        var signs_chars = 'chess__signs-chars chess__signs-chars--';

        // Подписи координат ячеек обертка слева
        var signs_numbers_left = signs_numbers + 'left';
        var signs_numbers_left_div = self.createDivByClass(signs_numbers_left);
        self.htmlAppend(chess_signs, signs_numbers_left_div);

        // Подписи координат ячеек обертка справа
        var signs_numbers_right = signs_numbers + 'right';
        var signs_numbers_right_div = self.createDivByClass(signs_numbers_right);
        self.htmlAppend(chess_signs, signs_numbers_right_div);

        // Подписи координат ячеек обертка сверху
        var signs_chars_top = signs_chars + 'top';
        var signs_chars_top_div = self.createDivByClass(signs_chars_top);
        self.htmlAppend(chess_signs, signs_chars_top_div);

        // Подписи координат ячеек обертка снизу
        var signs_chars_bottom = signs_chars + 'bottom';
        var signs_chars_bottom_div = self.createDivByClass(signs_chars_bottom);
        self.htmlAppend(chess_signs, signs_chars_bottom_div);

        // Числовая нумерация
        var numeric_numbering = '';
        for (var i = 0; i < size; i++) {
            numeric_numbering += '<span>' + (i + 1) + '</span>';
        }
        // Подписи координат ячеек слева
        self.htmlReplace(signs_numbers_left, numeric_numbering);
        // Подписи координат ячеек справа
        self.htmlReplace(signs_numbers_right, numeric_numbering);

        // Символьная нумерация
        var symbolic_numbering = '';
        var alphabet = getAlphabet();
        for (var i = 0; i < size && size <= alphabet.length; i++) {
            symbolic_numbering += '<span>' + alphabet.charAt(i) + '</span>';
        }
        // Подписи координат ячеек сверху
        self.htmlReplace(signs_chars_top, symbolic_numbering);
        // Подписи координат ячеек снизу
        self.htmlReplace(signs_chars_bottom, symbolic_numbering);
    };

    /**
     * Отображает возможный переход
     * 
     * @param {int} i
     *   Координата строки
     * @param {int} j
     *   Координата столбца
     */
    self.drawRoad = function (i, j) {
        jQuery('#coord-' + i + '-' + j).addClass('road');
    };

    /**
     * Сбрасывавает возможные ходы для шашек
     */
    self.clearRoad = function () {
        jQuery('.road').removeClass('road');
    };

    /**
     * Поиск возможных ходов для шашки
     * 
     * @param {int} i
     *   Строка в массиве состояний
     * @param {int} j
     *   Столбец в массиве состояний
     * @returns {int} roads
     *   Количество возможных ходов
     */
    self.findRoads = function (i, j) {
        var roads = 0;
        var size = self.getSize();
        var statesBoard = self.getStatesBoard();
        self.clearRoad(); // Стираем предыдущие пути
        // Не вышли за пределы игровой доски
        if (i >= 0 && i < size && j >= 0 && j < size) {
            // Является шашкой одного из игроков
            if (statesBoard[i][j] === 1 || statesBoard[i][j] === 2) {
                // - - -
                // Перестановка шашки на одну из соседних свободных клеток
                // Перестановка шашки через ячейку, если оно занято другой шашкой
                // - - -
                // Проверяем клетку сверху
                if (i - 1 >= 0) {
                    if (statesBoard[i - 1][j] === 0) {
                        self.drawRoad(i - 1, j);
                        roads++;
                    } else if (i - 2 >= 0) {
                        if (statesBoard[i - 2][j] !== 1 && statesBoard[i - 2][j] !== 2) {
                            self.drawRoad(i - 2, j);
                            roads++;
                        }
                    }
                }
                // Проверяем клетку снизу
                if (i + 1 < size) {
                    if (statesBoard[i + 1][j] === 0) {
                        self.drawRoad(i + 1, j);
                        roads++;
                    } else if (i + 2 < size) {
                        if (statesBoard[i + 2][j] !== 1 && statesBoard[i + 2][j] !== 2) {
                            self.drawRoad(i + 2, j);
                            roads++;
                        }
                    }
                }
                // Проверяем клетку слева
                if (j - 1 >= 0) {
                    if (statesBoard[i][j - 1] === 0) {
                        self.drawRoad(i, j - 1);
                        roads++;
                    } else if (j - 2 >= 0) {
                        if (statesBoard[i][j - 2] !== 1 && statesBoard[i][j - 2] !== 2) {
                            self.drawRoad(i, j - 2);
                            roads++;
                        }
                    }
                }
                // Проверяем клетку справа
                if (j + 1 < size) {
                    if (statesBoard[i][j + 1] === 0) {
                        self.drawRoad(i, j + 1);
                        roads++;
                    } else if (j + 2 < size) {
                        if (statesBoard[i][j + 2] !== 1 && statesBoard[i][j + 2] !== 2) {
                            self.drawRoad(i, j + 2);
                            roads++;
                        }
                    }
                }
                // Проверяем клетку сверху слева
                if (i - 1 >= 0 && j - 1 >= 0) {
                    if (statesBoard[i - 1][j - 1] === 0) {
                        self.drawRoad(i - 1, j - 1);
                        roads++;
                    } else if (i - 2 >= 0 && j - 2 >= 0) {
                        if (statesBoard[i - 2][j - 2] !== 1 && statesBoard[i - 2][j - 2] !== 2) {
                            self.drawRoad(i - 2, j - 2);
                            roads++;
                        }
                    }
                }
                // Проверяем клетку сверху справа
                if (i - 1 >= 0 && j + 1 < size) {
                    if (statesBoard[i - 1][j + 1] === 0) {
                        self.drawRoad(i - 1, j + 1);
                        roads++;
                    } else if (i - 2 >= 0 && j + 2 < size) {
                        if (statesBoard[i - 2][j + 2] !== 1 && statesBoard[i - 2][j + 2] !== 2) {
                            self.drawRoad(i - 2, j + 2);
                            roads++;
                        }
                    }
                }
                // Проверяем клетку снизу слева
                if (i + 1 < size && j - 1 >= 0) {
                    if (statesBoard[i + 1][j - 1] === 0) {
                        self.drawRoad(i + 1, j - 1);
                        roads++;
                    } else if (i + 2 < size && j - 2 >= 0) {
                        if (statesBoard[i + 2][j - 2] !== 1 && statesBoard[i + 2][j - 2] !== 2) {
                            self.drawRoad(i + 2, j - 2);
                            roads++;
                        }
                    }
                }
                // Проверяем клетку снизу справа
                if (i + 1 < size && j + 1 < size) {
                    if (statesBoard[i + 1][j + 1] === 0) {
                        self.drawRoad(i + 1, j + 1);
                        roads++;
                    } else if (i + 2 < size && j + 2 < size) {
                        if (statesBoard[i + 2][j + 2] !== 1 && statesBoard[i + 2][j + 2] !== 2) {
                            self.drawRoad(i + 2, j + 2);
                            roads++;
                        }
                    }
                }
            }
        }
        // Отслеживаем клик по возможному пути для шашки
        self.eventClickRoad();
        return roads;
    };

    /**
     * Удаляет шашку соперника с поля, если она окружена с трех сторон шашками текущего игрока
     */
    self.removeChecker = function () {
        var sideChecker = self.getSideChecker();           // Текущая шашка
        var sideCheckerRival = self.getSideCheckerRival(); // Шашка соперника
        var statesBoard = self.getStatesBoard();
        var newStatesBoard = statesBoard.map(function (arr) {
            return arr.slice();
        });
        var size = self.getSize();
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var matches = 0; // Соседних шашек соперника
                // Если проверяемая клетка соперника
                if (statesBoard[i][j] === sideCheckerRival) {
                    // Проверяем клетку сверху
                    if (i - 1 >= 0 && statesBoard[i - 1][j] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку снизу
                    if (i + 1 < size && statesBoard[i + 1][j] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку слева
                    if (j - 1 >= 0 && statesBoard[i][j - 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку справа
                    if (j + 1 < size && statesBoard[i][j + 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку сверху слева
                    if (i - 1 >= 0 && j - 1 >= 0 && statesBoard[i - 1][j - 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку сверху справа
                    if (i - 1 >= 0 && j + 1 < size && statesBoard[i - 1][j + 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку снизу слева
                    if (i + 1 < size && j - 1 >= 0 && statesBoard[i + 1][j - 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку снизу справа
                    if (i + 1 < size && j + 1 < size && statesBoard[i + 1][j + 1] === sideChecker) {
                        matches++;
                    }
                    // Удаление шашки, если ее окружили три шашки соперника
                    if (matches >= 3) {
                        newStatesBoard[i][j] = 0;
                    }
                }
                if (statesBoard[i][j] === sideChecker) {
                    // Проверяем клетку сверху
                    if (i - 1 >= 0 && statesBoard[i - 1][j] === sideCheckerRival) {
                        matches++;
                    }
                    // Проверяем клетку снизу
                    if (i + 1 < size && statesBoard[i + 1][j] === sideCheckerRival) {
                        matches++;
                    }
                    // Проверяем клетку слева
                    if (j - 1 >= 0 && statesBoard[i][j - 1] === sideCheckerRival) {
                        matches++;
                    }
                    // Проверяем клетку справа
                    if (j + 1 < size && statesBoard[i][j + 1] === sideCheckerRival) {
                        matches++;
                    }
                    // Проверяем клетку сверху слева
                    if (i - 1 >= 0 && j - 1 >= 0 && statesBoard[i - 1][j - 1] === sideCheckerRival) {
                        matches++;
                    }
                    // Проверяем клетку сверху справа
                    if (i - 1 >= 0 && j + 1 < size && statesBoard[i - 1][j + 1] === sideCheckerRival) {
                        matches++;
                    }
                    // Проверяем клетку снизу слева
                    if (i + 1 < size && j - 1 >= 0 && statesBoard[i + 1][j - 1] === sideCheckerRival) {
                        matches++;
                    }
                    // Проверяем клетку снизу справа
                    if (i + 1 < size && j + 1 < size && statesBoard[i + 1][j + 1] === sideCheckerRival) {
                        matches++;
                    }
                    // Удаление шашки, если ее окружили три шашки соперника
                    if (matches >= 3) {
                        newStatesBoard[i][j] = 0;
                    }
                }
            }
        }
        self.setStatesBoard(newStatesBoard);
    };

    /**
     * Добавляет шашку на пустую клетку, если она окружена с трех сторон
     * шашками одного игрока 
     */
    self.addChecker = function () {
        var sideChecker = self.getSideChecker(); // Текущая шашка
        var statesBoard = self.getStatesBoard();
        var newStatesBoard = statesBoard.map(function (arr) {
            return arr.slice();
        });
        var size = self.getSize();
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var matches = 0; // Соседних шашек текущего игрока
                // Если проверяемая клетка пустая
                if (statesBoard[i][j] === 0) {
                    // Проверяем клетку сверху
                    if (i - 1 >= 0 && statesBoard[i - 1][j] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку снизу
                    if (i + 1 < size && statesBoard[i + 1][j] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку слева
                    if (j - 1 >= 0 && statesBoard[i][j - 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку справа
                    if (j + 1 < size && statesBoard[i][j + 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку сверху слева
                    if (i - 1 >= 0 && j - 1 >= 0 && statesBoard[i - 1][j - 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку сверху справа
                    if (i - 1 >= 0 && j + 1 < size && statesBoard[i - 1][j + 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку снизу слева
                    if (i + 1 < size && j - 1 >= 0 && statesBoard[i + 1][j - 1] === sideChecker) {
                        matches++;
                    }
                    // Проверяем клетку снизу справа
                    if (i + 1 < size && j + 1 < size && statesBoard[i + 1][j + 1] === sideChecker) {
                        matches++;
                    }
                    // Добавление новой шашки, если требуется
                    if (matches >= 3) {
                        newStatesBoard[i][j] = sideChecker;
                    }
                }
            }
        }
        self.setStatesBoard(newStatesBoard);
    };

    /**
     * Отрисовка шашек на игровом поле
     */
    self.drawCheckers = function () {

        var statesBoard = self.getStatesBoard();
        var rows = '.chess__board-row';
        var cols = '.chess__board-element';
        self.clearRoad(); // Стираем предыдущие пути
        var i = 0;
        jQuery(rows).each(function () {
            var j = 0;
            jQuery(cols, this).each(function () {
                // Нумерация ячеек в виде одномерного массива
                jQuery(this).children().attr('id', 'coord-' + i + '-' + j);
                // Отрисовка шашек на экране
                if (statesBoard[i][j] === 1) {
                    jQuery(this).children().addClass('checker white_checker');
                } else if (statesBoard[i][j] === 2) {
                    jQuery(this).children().addClass('checker black_checker');
                } else if (statesBoard[i][j] === 0) {
                    jQuery(this).children().removeClass('checker white_checker black_checker');
                }
                j++;
            });
            i++;
        });
        // Отслеживаем клик по шашке
        self.eventClickChecker();
    };

    /**
     * Событие, отслеживающее клик по шашке
     */
    self.eventClickChecker = function () {
        // Сброс предыдущих обработчиков, если они были
        jQuery('.chess').off('click', '.checker');
        if (!self.gameEnd) {
            jQuery('.chess').on('click', '.checker', function () {
                var sideChecker = self.getSideChecker();
                if (sideChecker === 1) {
                    self.this_checker = self.white_checker;
                } else if (sideChecker === 2) {
                    self.this_checker = self.black_checker;
                } else {
                    if (jQuery(this).hasClass(self.white_checker)) {
                        self.this_checker = self.white_checker;
                    } else if (jQuery(this).hasClass(self.black_checker)) {
                        self.this_checker = self.black_checker;
                    }
                }
                if (!jQuery(this).hasClass(self.selected) && jQuery(this).hasClass(self.this_checker)) {
                    jQuery('.checker').removeClass(self.selected);
                    var white_checker_class = jQuery(this).hasClass(self.white_checker);
                    var black_checker_class = jQuery(this).hasClass(self.black_checker);
                    if (white_checker_class || black_checker_class) {
                        var id = jQuery(this).attr('id');               // Индексы в виде строки
                        var reg = /([0-9]+)/g;                          // Шаблон индексов
                        var indexes = convertArrayToInt(id.match(reg)); // Индексы ячейки
                        // Запоминаем координаты выбранной шашки
                        var i = indexes[0], j = indexes[1];
                        self.setSelectChecker(indexes);
                        var sideChecker = self.getSideChecker();
                        if (sideChecker === null) {
                            jQuery(this).addClass(self.selected);
                            if (white_checker_class) {
                                self.setSideChecker(1);
                            } else if (black_checker_class) {
                                self.setSideChecker(2);
                            }
                            self.findRoads(i, j); // Поиск возможных ходов
                        }
                        if (sideChecker === 1 && white_checker_class) {
                            jQuery(this).addClass(self.selected);
                            self.setSideChecker(1);
                            self.findRoads(i, j); // Поиск возможных ходов
                        } else if (sideChecker === 2 && black_checker_class) {
                            jQuery(this).addClass(self.selected);
                            self.setSideChecker(2);
                            self.findRoads(i, j); // Поиск возможных ходов
                        }
                        self.showMessage();
                    }
                }
            });
        }
    };

    /**
     * Событие, отслеживающее клик по возможному переходу
     */
    self.eventClickRoad = function () {
        jQuery('.chess').off('click', '.road');
        jQuery('.chess').one('click', '.road', function () {
            var statesBoard = self.getStatesBoard();
            // Координаты выбранной шашки
            var selectChecker = self.getSelectChecker();
            var i_cur = selectChecker[0], j_cur = selectChecker[1];
            // Новые координаты выбранной шашки
            var id = jQuery(this).attr('id');
            var reg = /([0-9]+)/g;
            var moveChecker = convertArrayToInt(id.match(reg));
            var i_new = moveChecker[0], j_new = moveChecker[1];
            // Убираем шашку с текущей позиции
            statesBoard[i_cur][j_cur] = 0;
            // Ставим шашку на новую позицию 
            statesBoard[i_new][j_new] = self.getSideChecker();
            // Сбрасываваем возможные ходы для шашек
            jQuery('.checker').removeClass(self.selected);
            self.setStatesBoard(statesBoard);
            // Удаление шашек соперника
            self.removeChecker();
            // Добавление новых шашек для текущего игрока
            self.addChecker();
            // Сменить текущую сторону
            self.changeSideChecker();
            // Отрисовываем шашки на игровом поле
            self.drawCheckers();
            // Проверка окончания игры
            self.gameOver();
            // Сообщение пользователю
            self.showMessage();
        });
    };

    /**
     * Отображает сообщение пользователю
     */
    self.showMessage = function () {
        var message = ''; // Сообщение пользователю

        if (self.gameEnd === true) {
            message += 'Игра завершена. ';
            if (self.winner === 1) {
                message += 'Белые выиграли. ';
            } else if (self.winner === 2) {
                message += 'Черные выиграли. ';
            } else if (self.winner === 0) {
                message += 'Ничья. ';
            }
        } else {
            if (self.sideChecker === null) {
                message += 'Выберите шашку, кликнув по ней ЛКМ. ';
            } else if (self.sideChecker === 1) {
                message += 'Ходят белые шашки. ';
            } else if (self.sideChecker === 2) {
                message += 'Ходят черные шашки. ';
            } else if (self.sideChecker === 0) {
                message += 'Нет ходов. ';
            }
        }

        jQuery('#message').text(message);

    };


    /**
     * Проверка окончания игры
     * Игра считается завершенной если:
     * 1) Нельзя сходить ни одной шашкой (ничья)
     * 2) Отсутствуют белые шашки (черные выиграли)
     * 3) Отсутствуют черные шашки (белые выиграли)
     */
    self.gameOver = function () {
        // Количество белых шашек
        var countWhiteCheckers = 0;
        // Количество черных шашек
        var countBlackCheckers = 0;
        // Число возможных переходов для белых шашек
        var roadsWhite = 0;
        // Число возможных переходов для черных шашек
        var roadsBlack = 0;
        // Состояния игровой доски
        var statesBoard = self.getStatesBoard();
        // Проход по всем клеткам игровой доски
        var size = self.getSize();
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (statesBoard[i][j] === 1) {
                    countWhiteCheckers++;
                    roadsWhite += self.findRoads(i, j);
                }
                if (statesBoard[i][j] === 2) {
                    countBlackCheckers++;
                    roadsBlack += self.findRoads(i, j);
                }
            }
        }
        self.clearRoad();

        if (countWhiteCheckers >= 3 && countBlackCheckers <= 2) { // Белые выиграли
            self.winner = 1;
        } else if (countBlackCheckers >= 3 && countWhiteCheckers <= 2) { // Чёрные выиграли
            self.winner = 2;
        } else if (countWhiteCheckers <= 2 && countBlackCheckers <= 2 || (roadsWhite === 0 && roadsBlack === 0)) { // Ничья
            self.winner = 0;
        }
        // Проверка окончания игры
        if (self.winner === 1 || self.winner === 2 || self.winner === 0) {
            self.gameEnd = true;
            self.sideChecker = 0;
        }
    };

}

/**
 * Инициализация игровых данных
 */
function init() {
    var message = '';                       // Сообщение пользователю
    var container = 'chess';               // Селектор контейнера для игрового поля
    var sizeBoard = getSizeBoard();         // Размер игрового поля
    var countCheckers = getCountCheckers(); // Количество шашек игрока
    // Проверка входных данных на валидность
    if (sizeBoard === '') {
        message = 'Введите размерность игрового поля.';
    } else if (countCheckers === '') {
        message = 'Введите число шашек у каждого игрока.';
    } else if (!isInt(sizeBoard)) {
        message = 'Размерность игрового поля дожно быть целым значением.';
    } else if (!isInt(countCheckers)) {
        message = 'Количество шашек игрока дожно быть целым значением.';
    } else if (!numPositive(sizeBoard) || sizeBoard < 3) {
        message = 'Размерность игрового поля дожно быть положительным значением и быть не менее 3.';
    } else if (!numPositive(countCheckers) || countCheckers < 3) {
        message = 'Количество шашек игрока дожно быть положительным значением и быть не менее 3.';
    } else if (!checkMaxSizeBoard(sizeBoard)) {
        message = 'Введен слишком большой размер игрового поля.';
    } else if (!checkMaxCountCheckers(sizeBoard, countCheckers)) {
        message = 'Введено слишком большое количество шашек для каждого игрока.';
    }
    if (message === '') { // Данные валидны и ошибок не было
        // Формируем игровое поле
        var board = new Board(container, sizeBoard, countCheckers);
        // Отрисовываем ячейки игрового поля
        board.drawBoard();
        // Отрисовываем шашки на игровом поле
        board.drawCheckers();
    } else {
        // Очищаем игровое поле
        jQuery('.chess').html('');
        jQuery('#message').html('<br>' + message);
    }
}

/**
 * Выполняем действия когда DOM полностью загружен
 */
jQuery(document).ready(function () {
    init();
    // Отслеживаем изменение игорового поля и количества шашек
    jQuery('#sizeBoard, #countCheckers').on('change keyup', function () {
        init();
    });
});