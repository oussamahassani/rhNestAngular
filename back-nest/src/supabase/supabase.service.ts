// src/supabase/supabase.service.ts
import { Injectable,Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as fs from 'fs';

import axios from 'axios';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
    private readonly logger = new Logger(SupabaseService.name);

  constructor() {
    this.supabase = createClient(
      'https://xholraeudmjdgxbihuwx.supabase.co',     // Replace with your Supabase URL
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhob2xyYWV1ZG1qZGd4YmlodXd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODI2Mjg1NSwiZXhwIjoyMDYzODM4ODU1fQ.iyDe9-UmUwOw8us_U78nw2Se6AjEBc8BZejkppo_IRQ'                            // Replace with your anon/public key
    );
  }
    private SUPABASE_URL = 'https://xholraeudmjdgxbihuwx.supabase.co'; // replace
  private SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhob2xyYWV1ZG1qZGd4YmlodXd4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODI2Mjg1NSwiZXhwIjoyMDYzODM4ODU1fQ.iyDe9-UmUwOw8us_U78nw2Se6AjEBc8BZejkppo_IRQ'; // replace
 async bucketExists(bucketName: string): Promise<boolean> {
    const response = await axios.get(
      `${this.SUPABASE_URL}/storage/v1/bucket/${bucketName}`,
      {
        headers: {
          apikey: this.SERVICE_ROLE_KEY,
          Authorization: `Bearer ${this.SERVICE_ROLE_KEY}`,
        },
        validateStatus: () => true, // prevent throwing on 404
      }
    );

    return response.status === 200;
  }
  async uploadFile(localPath: string, filename: string) {
    const fileBuffer = fs.readFileSync(localPath);
  const exists = await this.bucketExists("yassmine");
    if (!exists) {
                       this.logger.error(`Bucket "${"yassmine"}" does not exist`);

    }
    const { data, error } = await this.supabase.storage
      .from('yassmine') // bucket name
      .upload(filename, fileBuffer, {
        contentType: 'application/octet-stream',
        upsert: true, // overwrite if same filename
      });

    if (error) {
                 this.logger.error("Upload failed" +error.message );

      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const publicUrl = this.supabase.storage.from('yassmine').getPublicUrl(filename).data.publicUrl;

    return { filename, publicUrl };
  }
}
