*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
${BASE_URL}    http://api-server:8000

*** Test Cases ***
Verify Get All Patients Successfully
    [Documentation]    ทดสอบการดึงข้อมูลคนไข้ทั้งหมดจาก API
    Create Session    api_session    ${BASE_URL}
    ${response}=    GET On Session    api_session    /patients
    Status Should Be    200    ${response}
    Log To Console    \nResponse Data: ${response.json()}

Verify Create New Patient
    [Documentation]    ทดสอบการเพิ่มข้อมูลคนไข้ใหม่ผ่าน POST
    ${payload}=    Create Dictionary    hn_number=HN999    patient_name=Robot Tester    exam_date=2026-03-31    diagnosis=Automated Testing
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${response}=    POST On Session    api_session    /patients    json=${payload}    headers=${headers}
    Status Should Be    200    ${response}