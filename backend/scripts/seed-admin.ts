import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../src/users/schemas/user.schema';
import { UserRole } from '../src/common/enums/user-role.enum';
import * as bcrypt from 'bcryptjs';

async function seedAdmin() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    
    // Check if admin already exists
    const existingAdmin = await userModel.findOne({ 
      email: 'bainfo14@gmail.com',
      role: UserRole.ADMINISTRATOR 
    }).exec();
    
    if (existingAdmin) {
      console.log('Administrator user already exists');
      return;
    }
    
    // Check if any administrator exists
    const anyAdmin = await userModel.findOne({ 
      role: UserRole.ADMINISTRATOR 
    }).exec();
    
    if (anyAdmin) {
      console.log('Another administrator already exists. Only one administrator is allowed.');
      return;
    }
    
    // Create the default administrator
    const hashedPassword = await bcrypt.hash('123456', 12);
    
    const adminUser = new userModel({
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
  } finally {
    await app.close();
  }
}

seedAdmin();
