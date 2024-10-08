export default [
  {
    id : 1,
    avatarUri : '',
    name : 'Андрей',
    lastMessage : {
      message :'Изображение',
      your : false
    },
    when : '10:49',
    unreadCount : 2
  },
  {
    id : 2,
    avatarUri : '',
    name : 'Кино клуб',
    lastMessage : {
      message :'стикер',
      your : true
    },
    when : '10:49',
    unreadCount : 0
  },
  {
    id : 3,
    avatarUri : '',
    name : 'Илья',
    lastMessage : {
      message :'Друзья, у меня для вас особенный выпуск новостей!...',
      your : true
    },
    when : '15:12',
    unreadCount : 4
  },
  {
    id : 4,
    avatarUri : '',
    name : 'Вадим',
    lastMessage : {
      message :'Круто!',
      your : true
    },
    when : 'Пт',
    unreadCount : 2
  },
  {
    id : 5,
    avatarUri : '',
    name : 'тет-а-теты',
    lastMessage : {
      message :'Последнее сообщение',
      your : true
    },
    when : '12 Апр 2020',
    unreadCount : 0
  },
  {
    id : 6,
    avatarUri : '',
    name : '1, 2, 3',
    lastMessage : {
      message : 'Миллионы россиян ежедневно проводят десятки часов своего времени за какой-то херней бесполезной. Листают разнообразные ленты.',
      your : true
    },
    when : '1 Мая 2020',
    unreadCount : 1995
  },
]

// Пока для верстки будем использовать поле when. Потом полагаю время будет приходить в unix и надо будет написать
// функцию для отображаемого формата.
