import { userPool } from '../../../lib/cognito';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  userPool.signUp(email, password, [], null, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    res.status(200).json({ user: result.user });
  });
}