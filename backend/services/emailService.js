import { supabase } from "../database/supabaseClient.js";

export const sendRegistrationOTP = async (email, otp) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-otp-web', {
      body: { email, otp }
    });

    if (error) {
      throw new Error(error.message || 'Unknown function error');
    }

    console.log('OTP sent successfully:', data);
    return data;

  } catch (err) {
    console.error('Error sending OTP:', err.message);
    throw err;
  }
};