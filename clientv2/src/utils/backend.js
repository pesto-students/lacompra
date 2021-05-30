const backendDomain = process.env.NODE_ENV === 'production' ? 'https://lacompra-beta.herokuapp.com' : 'http://localhost:5000';

export default backendDomain;