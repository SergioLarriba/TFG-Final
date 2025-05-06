import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUp from '@/app/(auth)/signup';
import { supabase } from '@/lib/supabase'; // Mock de supabase si es necesario

jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
    },
    from: jest.fn(() => ({
      insert: jest.fn(),
    })),
  },
}));

describe('<SignUp />', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar mocks antes de cada prueba
  });

  test('debería renderizar el formulario de registro correctamente', () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    // Verificar si los campos están presentes
    expect(getByPlaceholderText('Sergio')).toBeTruthy(); // Nombre
    expect(getByPlaceholderText('sergio@gmail.com')).toBeTruthy(); // Correo
    expect(getByPlaceholderText('********')).toBeTruthy(); // Contraseña

    // Verificar si el botón de registro está presente
    expect(getByText('Registrarse')).toBeTruthy();
  });

  test('debería mostrar un error si el correo es inválido', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    // Ingresar valores inválidos
    fireEvent.changeText(getByPlaceholderText('Sergio'), 'Juan');
    fireEvent.changeText(getByPlaceholderText('sergio@gmail.com'), 'correo@invalido');
    fireEvent.changeText(getByPlaceholderText('********'), '12345');

    fireEvent.press(getByText('Registrarse'));

    // Esperar a que el mensaje de error se muestre
    await waitFor(() => getByText('Correo electrónico inválido'));

    expect(getByText('Correo electrónico inválido')).toBeTruthy();
  });

  test('debería registrar al usuario correctamente si los datos son válidos', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    // Mock de la respuesta de supabase
    supabase.auth.signUp.mockResolvedValueOnce({ data: { user: { id: '123' } }, error: null });
    supabase.from().insert.mockResolvedValueOnce({ error: null });
    supabase.auth.signInWithPassword.mockResolvedValueOnce({ error: null });

    // Ingresar datos válidos
    fireEvent.changeText(getByPlaceholderText('Sergio'), 'Juan');
    fireEvent.changeText(getByPlaceholderText('sergio@gmail.com'), 'juan@example.com');
    fireEvent.changeText(getByPlaceholderText('********'), '123456');

    fireEvent.press(getByText('Registrarse'));

    await waitFor(() => {
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'juan@example.com',
        password: '123456',
        options: { data: { name: 'Juan' } },
      });
      expect(supabase.from().insert).toHaveBeenCalledWith({
        user_id: '123',
        username: 'Juan',
        email: 'juan@example.com',
      });
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'juan@example.com',
        password: '123456',
      });
    });
  });

  test('debería mostrar un mensaje de error si ocurre un error en la API', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    // Mock de la respuesta de supabase con un error
    supabase.auth.signUp.mockResolvedValueOnce({ data: null, error: { message: 'Error al registrar' } });

    // Ingresar datos válidos
    fireEvent.changeText(getByPlaceholderText('Sergio'), 'Juan');
    fireEvent.changeText(getByPlaceholderText('sergio@gmail.com'), 'juan@example.com');
    fireEvent.changeText(getByPlaceholderText('********'), '123456');

    fireEvent.press(getByText('Registrarse'));

    await waitFor(() => getByText('Error al registrar'));

    expect(getByText('Error al registrar')).toBeTruthy();
  });

  test('debería mostrar un error si el nombre es demasiado corto', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    // Ingresar nombre corto
    fireEvent.changeText(getByPlaceholderText('Sergio'), 'A');
    fireEvent.changeText(getByPlaceholderText('sergio@gmail.com'), 'juan@example.com');
    fireEvent.changeText(getByPlaceholderText('********'), '123456');

    fireEvent.press(getByText('Registrarse'));

    await waitFor(() => getByText('El nombre debe tener al menos 2 caracteres'));

    expect(getByText('El nombre debe tener al menos 2 caracteres')).toBeTruthy();
  });

  test('debería mostrar un error si la contraseña es demasiado corta', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    // Ingresar una contraseña corta
    fireEvent.changeText(getByPlaceholderText('Sergio'), 'Juan');
    fireEvent.changeText(getByPlaceholderText('sergio@gmail.com'), 'juan@example.com');
    fireEvent.changeText(getByPlaceholderText('********'), '123');

    fireEvent.press(getByText('Registrarse'));

    await waitFor(() => getByText('La contraseña debe tener al menos 6 caracteres'));

    expect(getByText('La contraseña debe tener al menos 6 caracteres')).toBeTruthy();
  });
});
