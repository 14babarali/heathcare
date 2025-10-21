import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { UserRole } from '../common/enums/user-role.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    try {
      // Check if admin already exists
      const existingAdmin = await this.userModel.findOne({ 
        email: 'bainfo14@gmail.com',
        role: UserRole.ADMINISTRATOR 
      }).exec();
      
      if (existingAdmin) {
        console.log('Administrator user already exists');
        return;
      }
      
      // Check if any administrator exists
      const anyAdmin = await this.userModel.findOne({ 
        role: UserRole.ADMINISTRATOR 
      }).exec();
      
      if (anyAdmin) {
        console.log('Another administrator already exists. Only one administrator is allowed.');
        return;
      }
      
      // Create the default administrator
      const hashedPassword = await bcrypt.hash('123456', 12);
      
      const adminUser = new this.userModel({
        email: 'bainfo14@gmail.com',
        password: hashedPassword,
        firstName: 'System',
        lastName: 'Administrator',
        role: UserRole.ADMINISTRATOR,
        isActive: true,
        isEmailVerified: true,
      });
      
      await adminUser.save();
      
      console.log('Default administrator user created successfully:');
      console.log('Email: bainfo14@gmail.com');
      console.log('Password: 123456');
      console.log('Role: Administrator');
      
    } catch (error) {
      console.error('Error creating administrator user:', error);
    }
  }
}
