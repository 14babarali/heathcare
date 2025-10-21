import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Doctors')
@Controller('doctors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  findAll(@Query() filters: any) {
    return this.doctorsService.findAll(filters);
  }

  @Get('specialties')
  @ApiOperation({ summary: 'Get all specialties' })
  getSpecialties() {
    return this.doctorsService.getSpecialties();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get available doctors' })
  getAvailableDoctors(@Query('date') date: string, @Query('time') time: string) {
    return this.doctorsService.getAvailableDoctors(date, time);
  }

  @Get('my-profile')
  @Roles(UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get current doctor profile' })
  getMyProfile(@Request() req) {
    return this.doctorsService.findByUserId(req.user.userId);
  }

  @Patch('my-profile')
  @Roles(UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update current doctor profile' })
  updateMyProfile(@Request() req, @Body() updateData: any) {
    return this.doctorsService.findByUserId(req.user.userId).then(doctor => 
      this.doctorsService.update(doctor._id.toString(), updateData)
    );
  }

  @Patch('my-profile/availability')
  @Roles(UserRole.DOCTOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update doctor availability' })
  updateAvailability(@Request() req, @Body() body: { isAvailable: boolean }) {
    return this.doctorsService.findByUserId(req.user.userId).then(doctor => 
      this.doctorsService.updateAvailability(doctor._id.toString(), body.isAvailable)
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by ID' })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMINISTRATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update doctor (Admin only)' })
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.doctorsService.update(id, updateData);
  }

  @Patch(':id/rating')
  @ApiOperation({ summary: 'Update doctor rating' })
  updateRating(@Param('id') id: string, @Body() body: { rating: number }) {
    return this.doctorsService.updateRating(id, body.rating);
  }
}
