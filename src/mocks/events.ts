export interface Event {
  id: number;
  date: string;
  description: string;
  categoryId: number;
}

export const allEvents: Event[] = [
  // 1981-1986: Технологии (categoryId: 1)
  { id: 1, date: '1981-04-12', description: 'Первый полет шаттла «Колумбия»', categoryId: 1 },
  { id: 19, date: '1981-08-12', description: 'IBM PC выпущен', categoryId: 1 },
  { id: 2, date: '1983-01-19', description: 'Выпущен Apple Lisa', categoryId: 1 },
  { id: 3, date: '1984-02-01', description: 'Выпущен первый Macintosh', categoryId: 1 },
  { id: 21, date: '1984-06-06', description: 'Выпущена игра Tetris', categoryId: 1 },

  // 1987-1992: Кино (categoryId: 2)
  { id: 4, date: '1987-07-15', description: 'Выход фильма «Робокоп»', categoryId: 2 },
  { id: 5, date: '1989-06-23', description: 'Выход фильма «Бэтмен» Тима Бёртона', categoryId: 2 },
  { id: 6, date: '1991-07-03', description: 'Выход фильма «Терминатор 2: Судный день»', categoryId: 2 },
  { id: 27, date: '1992-01-01', description: 'Выход фильма «Бешеные псы»', categoryId: 2 },

  // 1993-1998: Литература (categoryId: 3)
  { id: 7, date: '1993-01-01', description: 'Выход романа «Над пропастью во ржи»', categoryId: 3 },
  { id: 8, date: '1995-01-01', description: 'Выход романа «Бойцовский клуб»', categoryId: 3 },
  { id: 9, date: '1997-06-26', description: 'Выход книги «Гарри Поттер и философский камень»', categoryId: 3 },

  // 1999-2004: Спорт (categoryId: 4)
  { id: 10, date: '2000-10-01', description: 'Закрытие летних Олимпийских игр в Сиднее', categoryId: 4 },
  { id: 11, date: '2002-06-30', description: 'Финал чемпионата мира по футболу в Японии и Корее', categoryId: 4 },
  { id: 12, date: '2004-08-29', description: 'Закрытие летних Олимпийских игр в Афинах', categoryId: 4 },

  // 2005-2010: Наука (categoryId: 5)
  { id: 13, date: '2006-08-24', description: 'Плутон лишен статуса планеты', categoryId: 5 },
  { id: 14, date: '2008-09-10', description: 'Запуск Большого адронного коллайдера', categoryId: 5 },
  { id: 15, date: '2010-10-22', description: 'Открытие графена', categoryId: 5 },

  // 2011-2016: История (categoryId: 6)
  { id: 16, date: '2011-04-29', description: 'Свадьба принца Уильяма и Кейт Миддлтон', categoryId: 6 },
  { id: 17, date: '2013-03-13', description: 'Избрание Папы Франциска', categoryId: 6 },
  { id: 18, date: '2016-06-23', description: 'Референдум о выходе Великобритании из ЕС (Brexit)', categoryId: 6 },
];
