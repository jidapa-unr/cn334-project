from pydantic import BaseModel, ConfigDict

class AppointmentForm(BaseModel):
    idCard: str
    fullName: str
    phone: str
    gender: str
    dob: str
    address: str
    maritalStatus: str
    appointmentDate: str
    appointmentTime: str

class LoginForm(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class PatientRecordBase(BaseModel):
    hn_number: str
    patient_name: str
    exam_date: str
    diagnosis: str
 
class PatientRecordCreate(PatientRecordBase):
    pass
 
class PatientRecord(PatientRecordBase):
    id: int
    model_config = ConfigDict(from_attributes=True)