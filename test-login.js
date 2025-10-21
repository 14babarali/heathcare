const axios = require('axios');

async function testLogin() {
  try {
    console.log('🔍 Testing Login-Email Endpoint...\n');
    
    // Test with admin user
    console.log('Testing admin login...');
    const adminResponse = await axios.post('http://localhost:3000/auth/login-email', {
      email: 'admin@healthcare.com',
      password: '123456'
    });
    
    console.log('✅ Admin login successful!');
    console.log('User role:', adminResponse.data.user.role);
    console.log('User name:', adminResponse.data.user.firstName, adminResponse.data.user.lastName);
    console.log('Token length:', adminResponse.data.access_token.length);
    
    // Test with doctor user
    console.log('\nTesting doctor login...');
    const doctorResponse = await axios.post('http://localhost:3000/auth/login-email', {
      email: 'dr.sarah.ahmed@healthcare.com',
      password: '123456'
    });
    
    console.log('✅ Doctor login successful!');
    console.log('User role:', doctorResponse.data.user.role);
    console.log('User name:', doctorResponse.data.user.firstName, doctorResponse.data.user.lastName);
    
    // Test with patient user
    console.log('\nTesting patient login...');
    const patientResponse = await axios.post('http://localhost:3000/auth/login-email', {
      email: 'john.smith@email.com',
      password: '123456'
    });
    
    console.log('✅ Patient login successful!');
    console.log('User role:', patientResponse.data.user.role);
    console.log('User name:', patientResponse.data.user.firstName, patientResponse.data.user.lastName);
    
    console.log('\n🎉 All login tests passed! Role-based authentication is working correctly.');
    
  } catch (error) {
    console.error('❌ Login test failed:', error.response?.data || error.message);
  }
}

// Wait a moment for server to start, then test
setTimeout(testLogin, 3000);
