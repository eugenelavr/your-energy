export async function subscribeEmail(email) {

  
  const response = await fetch('https://your-energy.b.goit.study/api/quote', {
      
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      
    });
  
    if (response.status === 409) {
      throw new Error('This email is already subscribed.');
    }
  
    if (!response.ok) {
      throw new Error('Something went wrong. Try again.');
    }
  
    return await response.json();
  }
  