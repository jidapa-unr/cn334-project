'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ReusableForm from '../../../components/ReusableForm'

interface PatientRecord {
  id: number
  hn_number: string
  patient_name: string
  exam_date: string
  diagnosis: string
}

export default function EditPatientPage() {
  const router = useRouter()
  const params = useParams()
  const patientId = Number(params.id)

  const [patientData, setPatientData] = useState<PatientRecord | null>(null)

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch('http://localhost:3340/patients')
        if (response.ok) {
          const data: PatientRecord[] = await response.json()
          const foundPatient = data.find((item) => item.id === patientId)

          if (foundPatient) {
            setPatientData(foundPatient)
          } else {
            alert('ไม่พบข้อมูลคนไข้')
            router.push('/admin/patients')
          }
        }
      } catch (error) {
        console.error('Error fetching patient:', error)
      }
    }

    if (patientId) {
      fetchPatient()
    }
  }, [patientId, router])

  const patientFields = [
    { name: 'hn_number', label: 'HN Number', type: 'text' as const },
    { name: 'patient_name', label: 'Patient Name', type: 'text' as const },
    { name: 'exam_date', label: 'Exam Date', type: 'date' as const },
    { name: 'diagnosis', label: 'Diagnosis', type: 'text' as const }
  ]

  const handleUpdate = async (formData: Omit<PatientRecord, 'id'>) => {
    try {
      const response = await fetch(`http://localhost:3340/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert('อัปเดตข้อมูลสำเร็จ')
        router.push('/admin/patients')
      } else {
        alert('อัปเดตข้อมูลไม่สำเร็จ')
      }
    } catch (error) {
      console.error('Error updating patient:', error)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        แก้ไขข้อมูลคนไข้
      </h1>

      {patientData && (
        <ReusableForm
          title="แก้ไขข้อมูลคนไข้"
          fields={patientFields}
          initialData={patientData}
          onSubmit={handleUpdate}
          onCancel={() => router.push('/admin/patients')}
        />
      )}
    </div>
  )
}