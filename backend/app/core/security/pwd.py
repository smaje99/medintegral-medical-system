from passlib.context import CryptContext


pwd_context = CryptContext(
    schemes=['bcrypt', 'des_crypt'], default='bcrypt', deprecated='auto'
)


def get_password_hash(password: str) -> str:
    '''Generates a hash from password encryption.

    Args:
        password (str): Password to encrypt.

    Returns:
        str: Hashed password.
    '''
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    '''Verify if a plain password matches an hashed password.

    Args:
        plain_password (str): Plain password.
        hashed_password (str): Hashed password.

    Returns:
        bool: True if the password match, otherwise False.
    '''
    return pwd_context.verify(plain_password, hashed_password)


def generate_password(user_id: int) -> str:
    '''Generate a password from a user ID.

    Args:
        user_id (int): User ID.

    Returns:
        str: Hash based on user ID encryption.
    '''
    return pwd_context.hash(str(user_id), scheme='des_crypt')
