const initialData = {
  icons: {
    'icon-1': { id: 'icon-1', content: 'https://www.gmail.com'},
    'icon-2': { id: 'icon-2', content: 'https://news.google.co.uk'},
    'icon-3': { id: 'icon-3', content: 'https://www.9gag.com'},
    'icon-4': { id: 'icon-4', content: 'https://codesandbox.io'},
    'icon-5': { id: 'icon-5', content: 'https://www.facebook.com/'},
    'icon-6': { id: 'icon-6', content: 'http://www.youtube.com/'},
    'icon-7': { id: 'icon-7', content: 'http://www.visualcapitalist.com'},
    'icon-8': { id: 'icon-8', content: 'https://www.glasgow.gov.uk/forms/refuseandrecyclingcalendar/AddressSearch.aspx'},
    'icon-9': { id: 'icon-9', content: 'https://docs.google.com/spreadsheets/d/1t6ykj2HWJfI97DTQT2ISyryjMZS5NhJ5DpeBQBvBPoQ/edit?ts=5e5536d1#gid=1505922450'},
    'icon-10': { id: 'icon-10', content: 'https://keep.google.com/u/0'},
    'icon-11': { id: 'icon-11', content: 'https://www.codewars.com/'},
    'icon-12': { id: 'icon-12', content: 'https://www.dndbeyond.com/'},
    'icon-13': { id: 'icon-13', content: 'https://twitter.com/'},
    'icon-14': { id: 'icon-14', content: 'https://stackblitz.com/'},
    'icon-15': { id: 'icon-15', content: 'http://dnd5e.wikidot.com/'},
    'icon-16': { id: 'icon-16', content: 'http://translate.google.com/#'},
    'icon-17': { id: 'icon-17', content: 'https://www.sendrecurring.com/manage'},
    'icon-18': { id: 'icon-18', content: 'https://outlook.live.com/owa/'},
    'icon-19': { id: 'icon-19', content: 'http://chrome://flags'},
    'icon-20': { id: 'icon-20', content: 'https://drive.google.com/?tab=wo&authuser=0#my-drive'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Column-1',
      iconIds: ['icon-1', 'icon-2', 'icon-3', 'icon-4', 'icon-5'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Column-2',
      iconIds: ['icon-6', 'icon-7', 'icon-8', 'icon-9', 'icon-10'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Column-3',
      iconIds: ['icon-11', 'icon-12', 'icon-13', 'icon-14'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Column-4',
      iconIds: ['icon-15', 'icon-16', 'icon-17', 'icon-18', 'icon-19', 'icon-20'],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3' , 'column-4'],
};

export default initialData;