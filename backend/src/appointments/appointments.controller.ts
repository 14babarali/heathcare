import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto, CancelAppointmentDto } from './dto/appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Appointments')
@Controller('appointments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create new appointment',
    description: 'Book a new appointment with a doctor. Patient can book appointments for themselves.'
  })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Appointment created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
        doctorId: { type: 'string', example: '507f1f77bcf86cd799439012' },
        patientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
        appointmentDate: { type: 'string', example: '2024-12-25' },
        startTime: { type: 'string', example: '09:00' },
        endTime: { type: 'string', example: '10:00' },
        type: { type: 'string', example: 'in-person' },
        status: { type: 'string', example: 'Pending' },
        problemDescription: { type: 'string', example: 'Regular checkup' },
        createdAt: { type: 'string', example: '2024-01-01T00:00:00.000Z' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error or doctor not available' })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid or missing token' })
  @ApiResponse({ status: 404, description: 'Doctor not found' })
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
    return this.appointmentsService.create(createAppointmentDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all appointments',
    description: 'Retrieve appointments with optional filtering. Supports filtering by doctor, patient, status, type, and date range.'
  })
  @ApiQuery({ name: 'doctorId', required: false, description: 'Filter by doctor ID', example: '507f1f77bcf86cd799439012' })
  @ApiQuery({ name: 'patientId', required: false, description: 'Filter by patient ID', example: '507f1f77bcf86cd799439013' })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by appointment status', example: 'Confirmed' })
  @ApiQuery({ name: 'type', required: false, description: 'Filter by appointment type', example: 'in-person' })
  @ApiQuery({ name: 'dateFrom', required: false, description: 'Filter from date (ISO format)', example: '2024-01-01' })
  @ApiQuery({ name: 'dateTo', required: false, description: 'Filter to date (ISO format)', example: '2024-12-31' })
  @ApiResponse({ 
    status: 200, 
    description: 'Appointments retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '507f1f77bcf86cd799439011' },
          doctorId: { type: 'string', example: '507f1f77bcf86cd799439012' },
          patientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
          appointmentDate: { type: 'string', example: '2024-12-25' },
          startTime: { type: 'string', example: '09:00' },
          endTime: { type: 'string', example: '10:00' },
          type: { type: 'string', example: 'in-person' },
          status: { type: 'string', example: 'Confirmed' },
          problemDescription: { type: 'string', example: 'Regular checkup' }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid or missing token' })
  findAll(@Query() filters: any) {
    return this.appointmentsService.findAll(filters);
  }

  @Get('upcoming')
  @ApiOperation({ 
    summary: 'Get upcoming appointments',
    description: 'Get upcoming appointments for the current user (patient or doctor).'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Upcoming appointments retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '507f1f77bcf86cd799439011' },
          doctorId: { type: 'string', example: '507f1f77bcf86cd799439012' },
          patientId: { type: 'string', example: '507f1f77bcf86cd799439013' },
          appointmentDate: { type: 'string', example: '2024-12-25' },
          startTime: { type: 'string', example: '09:00' },
          endTime: { type: 'string', example: '10:00' },
          type: { type: 'string', example: 'in-person' },
          status: { type: 'string', example: 'Confirmed' },
          problemDescription: { type: 'string', example: 'Regular checkup' }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - invalid or missing token' })
  getUpcoming(@Request() req) {
    return this.appointmentsService.getUpcomingAppointments(req.user.userId, req.user.role);
  }

  @Get('doctor/:doctorId')
  @ApiOperation({ summary: 'Get appointments for a specific doctor' })
  getDoctorAppointments(@Param('doctorId') doctorId: string, @Query() filters: any) {
    return this.appointmentsService.getDoctorAppointments(doctorId, filters);
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Get appointments for a specific patient' })
  getPatientAppointments(@Param('patientId') patientId: string, @Query() filters: any) {
    return this.appointmentsService.getPatientAppointments(patientId, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment by ID' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update appointment' })
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel appointment' })
  cancel(@Param('id') id: string, @Body() cancelAppointmentDto: CancelAppointmentDto, @Request() req) {
    return this.appointmentsService.cancel(id, cancelAppointmentDto, req.user.userId);
  }

  @Delete(':id')
  @Roles(UserRole.ADMINISTRATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete appointment (Admin only)' })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
