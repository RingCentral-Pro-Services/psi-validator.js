import Validator from './validators/validator';
import EmailValidator from './validators/email';
import PinValidator from './validators/pin';
import PasswordValidator from './validators/password';
import LimitedExtensionContactValidator from './validators/limited-extension-contact';
import LimitedExtensionValidator from './validators/limited-extension';
import NumberValidator from './validators/number';
import DnsValidator from './validators/dns';

export = {
    Validator,
    EmailValidator,
    PinValidator,
    PasswordValidator,
    LimitedExtensionContactValidator,
    LimitedExtensionValidator,
    NumberValidator,
    DnsValidator
};