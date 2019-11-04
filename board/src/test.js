let secretData = '어쩌구저쩌구'

const getSecretData = () => {
  return secretData
}

const setSecretData = (data) => {
  secretData = data
}

export { getSecretData as get, setSecretData as set }