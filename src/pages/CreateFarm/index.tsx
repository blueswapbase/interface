// Adjust the import path as needed
import { ButtonPrimary } from 'components/Button'
import { useCreateNewIncentive } from 'components/Farms/Staking/createNewIncentive'
import { MAX_WIDTH_MEDIA_BREAKPOINT } from 'components/Tokens/constants'
import React, { useState } from 'react'
import styled from 'styled-components'

const CreateFarmContainer = styled.div`
  width: 50%;
  min-width: 320px;
  padding: 68px 12px 0px;

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    padding-top: 48px;
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    padding-top: 20px;
  }
`

const FormContainer = styled.div`
  margin-bottom: 32px;
  max-width: ${MAX_WIDTH_MEDIA_BREAKPOINT}; // Use the same max-width as your TokenTable for consistency
  margin-left: auto;
  margin-right: auto;
  background-color: ${({ theme }) => theme.backgroundSurface}; // Adjust according to your theme
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.01), 0 4px 8px rgba(0, 0, 0, 0.04), 0 16px 24px rgba(0, 0, 0, 0.04),
    0 24px 32px rgba(0, 0, 0, 0.01);
`

const FormField = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.textPrimary}; // Adjust according to your theme
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.backgroundOutline}; // Adjust according to your theme
  box-sizing: border-box;
`

const CreateFarm = () => {
  const { createNewIncentive } = useCreateNewIncentive()

  const [formData, setFormData] = useState({
    pool: '',
    refundee: '',
    startTime: '',
    endTime: '',
    rewardToken: '',
    rewardAmount: '',
  })

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const rewardAmount = parseInt(formData.rewardAmount)

    const incentiveDetails = {
      pool: formData.pool,
      refundee: formData.refundee,
      rewardToken: formData.rewardToken,
      startTime: Math.floor(new Date(formData.startTime).getTime() / 1000),
      endTime: Math.floor(new Date(formData.endTime).getTime() / 1000),
      // You might need additional fields here
    }
    console.log(incentiveDetails)
    await createNewIncentive(incentiveDetails, rewardAmount)

    console.log(formData)
    // Handle farm creation logic here
    // After creation, you may want to redirect the user
    // history.push('/path-to-redirect');
  }

  return (
    <CreateFarmContainer>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <h2>Create a New Farm</h2>
          <FormField>
            <Label htmlFor="pool">Pool Address (LOBOSWAP pool only)</Label>
            <Input id="pool" name="pool" value={formData.pool} onChange={handleChange} />
          </FormField>
          <FormField>
            <Label htmlFor="rewardToken">Reward Token (address) for LP Stakers</Label>
            <Input id="rewardToken" name="rewardToken" value={formData.rewardToken} onChange={handleChange} />
          </FormField>
          <FormField>
            <Label htmlFor="rewardAmount">Reward Amount (ex. 1000) </Label>
            <Input id="rewardAmount" name="rewardAmount" value={formData.rewardAmount} onChange={handleChange} />
          </FormField>
          <FormField>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="endTime">End Time</Label>
            <Input type="datetime-local" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} />
          </FormField>
          <FormField>
            <Label htmlFor="refundee">Refundee (address) to send any remaining tokens from farm</Label>
            <Input id="refundee" name="refundee" value={formData.refundee} onChange={handleChange} />
          </FormField>
          <ButtonPrimary type="submit">Create Farm</ButtonPrimary>
        </FormContainer>
      </form>
    </CreateFarmContainer>
  )
}

export default CreateFarm
