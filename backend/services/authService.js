import { supabase } from '../database/supabaseClient.js';
import { sendRegistrationOTP } from './emailService.js';
import { generateOtp } from '../utils/otpGenerator.js';

export const generateAndSendOTP = async ({ name, email, password, role }) => {
  const otp = generateOtp();

  const { error: insertError } = await supabase.from('email_otp').insert([
    { email, otp, created_at: new Date() }
  ]);
  if (insertError) throw new Error('Failed to store OTP');

  await sendRegistrationOTP(email, otp);

  return { message: 'OTP sent'};
};

export const otpVerification = async ({email, userOtp}) => {
  const { data, error } = await supabase
      .from('email_otp')
      .select('*')
      .eq('email', email)
      .eq('otp', userOtp)
      .order('created_at', { ascending: false })
      .limit(1);

      console.log('Supabase query error:', error);
      console.log('Supabase query data:', data);
      //console.log('Comparing OTP:', userOTP);

    if (error || !data || data.length === 0) {
      throw new Error("Invalid OTP!")
    }
}

export const Signup = async({name, email, password, role}) => {
  const { data: response, error: signUpError } = await supabase.auth.signUp(
    {email, password}
  )

  if(signUpError) {
    throw new Error(signUpError?.message);
  }

  const tableMap = {
      Contractor: 'contractor',
      SiteManager: 'site_manager',
      Employee: 'employee'
    };

    const table = tableMap[role];
    const userId = response?.user?.id;

    if(userId) {
    
      const { error: insertError } = await supabase.from(table).insert([
        { id: userId, name: name, email: email, created_at: new Date() }
      ]);

      if (insertError) {
        console.error(insertError.message);
        throw new Error(insertError?.message);
      }
    }

    console.log("Registration Successful!")
}

export const signIn = async({email, password}) => {
  const { data, error } = await supabase.auth.signInWithPassword(
    {email, password}
  )

  if (error || !data || !data.user) {
    throw new Error(error?.message || 'Invalid credentials' );
  }

  const userId = data.user.id;

  const checkRole = async (table) => {
      const { data:roleData } = await supabase
        .from(table)
        .select('id, email')
        .eq('email', email)
        .maybeSingle();

      return roleData ? { table, name: roleData.name } : null;
    };

  const roles = ['contractor', 'site_manager', 'employee'];
    let roleInfo  = null;

    for (let r of roles) {
      roleInfo  = await checkRole(r);
      if (roleInfo) break;
    }

    if (!roleInfo) {
      throw new Error('User Not Found');
    }

    return {
      message: 'Login successful',
      user: {
        id: userId,
        name: roleInfo.name,
        email,
        role: roleInfo.table,
      },
    };
}
