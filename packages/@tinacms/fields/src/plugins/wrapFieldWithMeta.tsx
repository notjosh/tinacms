/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import * as React from 'react'
import { FieldProps } from './fieldProps'
import styled from 'styled-components'

type InputFieldType<ExtraFieldProps, InputProps> = FieldProps<InputProps> &
  ExtraFieldProps

// Wraps the Field component in labels describing the field's meta state
// Add any other fields that the Field component should expect onto the ExtraFieldProps generic type
export function wrapFieldsWithMeta<ExtraFieldProps = {}, InputProps = {}>(
  Field:
    | React.StatelessComponent<InputFieldType<ExtraFieldProps, InputProps>>
    | React.ComponentClass<InputFieldType<ExtraFieldProps, InputProps>>
) {
  return (props: InputFieldType<ExtraFieldProps, InputProps>) => (
    <FieldMeta
      name={props.input.name}
      label={props.field.label}
      description={props.field.description}
      error={props.meta.error}
    >
      <Field {...props} />
    </FieldMeta>
  )
}

interface FieldMetaProps {
  name: string
  label?: string
  description?: string
  error?: string
}

export const FieldMeta: React.FC<FieldMetaProps> = props => {
  return (
    <FieldWrapper>
      <FieldLabel htmlFor={name}>
        {props.label || props.name}
        {props.description && (
          <FieldDescription>{props.description}</FieldDescription>
        )}
      </FieldLabel>
      {props.children}
      {props.error && <FieldError>{props.error}</FieldError>}
    </FieldWrapper>
  )
}

// Styling
const FieldWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`

const FieldLabel = styled.label`
  display: block;
  font-size: var(--tina-font-size-1);
  font-weight: 600;
  letter-spacing: 0.01em;
  line-height: 1.35;
  color: var(--tina-color-grey-8);
  margin-bottom: 8px;
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
`

export const FieldDescription = styled.p`
  color: var(--tina-color-grey-6);
  font-size: var(--tina-font-size-0);
  font-style: italic;
  font-weight: lighter;
  padding-top: 4px;
  white-space: normal;
  margin: 0;
`

const FieldError = styled.span`
  display: block;
  color: red;
  font-size: var(--tina-font-size-1);
  margin-top: 8px;
  font-weight: 500;
`
