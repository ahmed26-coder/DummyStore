import { supabase } from "@/lib/supabase";

type FormState = {
  success?: boolean;
  error?: string;
};

export async function handleFormSubmit(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const firstname = formData.get('firstname') as string;
  const lastname = formData.get('lastname') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;
  const subject  = formData.get('subject ') as string;


  if (!firstname || !lastname || !subject || !email  || !email || !phone || !message) {
    return { success: false, error: 'Please fill in all fields.' };
  }

  const { error } = await supabase.from('Contact_HDF').insert([
    { name, email, phone, message }
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
