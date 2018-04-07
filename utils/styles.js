import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  deck: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  btn: {
    borderRadius: 10,
    padding: 20,
    marginVertical: 10
  },
  btnText: {
    textAlign: 'center',
    color: '#FFF'
  },
  center: {
    textAlign: 'center'
  },
  input: {
    height: 60,
    alignContent: 'stretch',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20
  }
})
