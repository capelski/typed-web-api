import { Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { HttpMethodCore } from './http-method-core';

export const HttpMethod = HttpMethodCore({
  Delete,
  Get,
  Patch,
  Post,
  Put,
});
