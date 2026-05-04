# Database Schema

## Babies
- id
- user_id
- name
- dob
- weight

## Feeding Logs
- id
- baby_id
- time
- type
- quantity

## Sleep Logs
- id
- baby_id
- start_time
- end_time

## Diaper Logs
- id
- baby_id
- time
- type

## Reminders
- id
- baby_id
- title
- date
- notify_before