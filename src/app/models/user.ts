export type User = {
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  email?: string;
  phone?: string;
  address: {
    street?: string, 
    city?: string,
    state?: string,
    zipcode?: string
    };
}; 