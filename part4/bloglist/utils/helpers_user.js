const newUser = {
  username: 'adela',
  password: 'Cum sa fii faer',
  name: 'Adela',
}

const newUserShortPassword = {
  username: 'Ana',
  password: '12',
  name: 'Ana',
}

const newUserUsernameMissing = {
  password: 'Cum sa fii faer',
  name: 'Cineva',
}

const newUserNameTaken = {
  username: 'adela',
  password: 'Cum sa fii faer',
  name: 'Carmen',
}

module.exports = {
  newUser,
  newUserNameTaken,
  newUserShortPassword,
  newUserUsernameMissing,
}
